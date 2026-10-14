import type { VideoProvider } from "../providers/video-provider.interface";
import { MockVideoProvider } from "../providers/mock-provider";
import { DeepInfraVideoProvider } from "../providers/deepinfra-provider";
import { FfmpegComposer } from "../composer/ffmpeg-composer";
import type { CanonicalTimeline, ScriptVariant, TimelineOverlay } from "../types/timeline";

export interface JobExecutionInput {
  jobId: string;
  briefId: string;
  variant: ScriptVariant;
  providerType?: "p-video" | "mock";
  existingProofFootageUrl?: string;
}

export interface JobExecutionResult {
  jobId: string;
  status: "completed" | "failed";
  timeline: CanonicalTimeline;
  renderedVideoUrl: string;
  variableCost: number;
  aiSecondsBilled: number;
  error?: string;
}

export class JobProcessor {
  private getProvider(providerType: string = "p-video"): VideoProvider {
    if (providerType === "mock" || !process.env.DEEPINFRA_API_KEY) {
      return new MockVideoProvider();
    }
    return new DeepInfraVideoProvider();
  }

  async executeFullGeneration(input: JobExecutionInput): Promise<JobExecutionResult> {
    const { jobId, variant, providerType = "p-video" } = input;
    const provider = this.getProvider(providerType);

    const hookDuration = variant.estimatedAiSeconds || 3.5;
    const hookResult = await provider.generateVideo({
      prompt: `Vertical product commercial hook: ${variant.hookText}`,
      durationSeconds: hookDuration,
      draftMode: false,
    });

    const bodyFootageUrl = input.existingProofFootageUrl || "/sample-video.mp4";

    const timeline: CanonicalTimeline = {
      version: "1.0",
      aspectRatio: "9:16",
      resolution: { width: 1080, height: 1920 },
      durationSeconds: hookDuration + 10,
      scenes: [
        {
          id: "scene_1_hook",
          durationSeconds: hookDuration,
          videoAssetUrl: hookResult.videoUrl || bodyFootageUrl,
          isAiGenerated: true,
          prompt: variant.hookText,
          label: "AI Hook",
        },
        {
          id: "scene_2_body_proof",
          durationSeconds: 10,
          videoAssetUrl: bodyFootageUrl,
          isAiGenerated: false,
          label: "Approved Proof Footage",
        },
      ],
      overlays: [
        {
          id: "ov_hook",
          type: "text",
          content: variant.hookText,
          startTime: 0,
          endTime: hookDuration,
          style: { fontSize: 44, color: "#FFFFFF", safeArea: true },
        },
        {
          id: "ov_proof",
          type: "caption",
          content: variant.bodyText,
          startTime: hookDuration,
          endTime: hookDuration + 7,
          style: { fontSize: 36, color: "#F0F0F0", safeArea: true },
        },
        {
          id: "ov_cta",
          type: "cta",
          content: variant.ctaText,
          startTime: hookDuration + 7,
          endTime: hookDuration + 10,
          style: { fontSize: 46, color: "#FFE600", safeArea: true },
        },
      ],
    };

    const render = await FfmpegComposer.composeTimeline(timeline);
    const variableCost = Number((hookResult.costIncurred + 0.05).toFixed(4));

    return {
      jobId,
      status: "completed",
      timeline,
      renderedVideoUrl: hookResult.videoUrl || bodyFootageUrl,
      variableCost,
      aiSecondsBilled: hookDuration,
    };
  }

  async executeOverlayRecomposition(timeline: CanonicalTimeline, updatedOverlays: TimelineOverlay[]): Promise<CanonicalTimeline> {
    const updatedTimeline: CanonicalTimeline = {
      ...timeline,
      overlays: updatedOverlays,
    };

    await FfmpegComposer.composeTimeline(updatedTimeline);
    return updatedTimeline;
  }
}
