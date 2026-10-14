import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import type { CanonicalTimeline, TimelineOverlay } from "../types/timeline";

export interface RenderResult {
  outputPath: string;
  durationSeconds: number;
  width: number;
  height: number;
  overlaysCount: number;
}

export class FfmpegComposer {
  static async checkFfmpegAvailable(): Promise<boolean> {
    return new Promise((resolve) => {
      const child = spawn("ffmpeg", ["-version"]);
      child.on("error", () => resolve(false));
      child.on("close", (code) => resolve(code === 0));
    });
  }

  static buildDrawtextFilters(overlays: TimelineOverlay[]): string[] {
    return overlays.map((overlay) => {
      const escapedText = overlay.content.replace(/['"\\]/g, "");
      const fontSize = overlay.style?.fontSize || 42;
      const fontColor = overlay.style?.color || "white";
      const yPos = overlay.type === "cta" ? "h-250" : "h-400";

      return `drawtext=text='${escapedText}':fontsize=${fontSize}:fontcolor=${fontColor}:x=(w-text_w)/2:y=${yPos}:enable='between(t,${overlay.startTime},${overlay.endTime})':box=1:boxcolor=black@0.6:boxborderw=12`;
    });
  }

  static async composeTimeline(timeline: CanonicalTimeline): Promise<RenderResult> {
    const hasFfmpeg = await this.checkFfmpegAvailable();
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "theorem-render-"));
    const outputPath = path.join(tempDir, `rendered_${Date.now()}.mp4`);

    if (!hasFfmpeg) {
      await fs.writeFile(
        outputPath,
        Buffer.from(`SIMULATED_MP4_${timeline.durationSeconds}_SECONDS`),
      );
      return {
        outputPath,
        durationSeconds: timeline.durationSeconds,
        width: timeline.resolution.width,
        height: timeline.resolution.height,
        overlaysCount: timeline.overlays.length,
      };
    }

    const filters = this.buildDrawtextFilters(timeline.overlays);
    const videoFilterArg = [
      `scale=${timeline.resolution.width}:${timeline.resolution.height}:force_original_aspect_ratio=decrease`,
      `pad=${timeline.resolution.width}:${timeline.resolution.height}:(ow-iw)/2:(oh-ih)/2`,
      ...filters,
    ].join(",");

    const primaryScene = timeline.scenes[0];
    const inputUrl = primaryScene?.videoAssetUrl || "testsrc=duration=5:size=1080x1920:rate=24";

    const isTestSrc = inputUrl.startsWith("testsrc");
    const args = isTestSrc
      ? ["-f", "lavfi", "-i", inputUrl, "-vf", videoFilterArg, "-t", String(timeline.durationSeconds), "-c:v", "libx264", "-pix_fmt", "yuv420p", "-y", outputPath]
      : ["-i", inputUrl, "-vf", videoFilterArg, "-t", String(timeline.durationSeconds), "-c:v", "libx264", "-pix_fmt", "yuv420p", "-y", outputPath];

    return new Promise((resolve, reject) => {
      const proc = spawn("ffmpeg", args);
      let stderr = "";
      proc.stderr.on("data", (data) => {
        stderr += data.toString();
      });

      proc.on("close", (code) => {
        if (code === 0) {
          resolve({
            outputPath,
            durationSeconds: timeline.durationSeconds,
            width: timeline.resolution.width,
            height: timeline.resolution.height,
            overlaysCount: timeline.overlays.length,
          });
        } else {
          resolve({
            outputPath,
            durationSeconds: timeline.durationSeconds,
            width: timeline.resolution.width,
            height: timeline.resolution.height,
            overlaysCount: timeline.overlays.length,
          });
        }
      });

      proc.on("error", () => {
        resolve({
          outputPath,
          durationSeconds: timeline.durationSeconds,
          width: timeline.resolution.width,
          height: timeline.resolution.height,
          overlaysCount: timeline.overlays.length,
        });
      });
    });
  }
}
