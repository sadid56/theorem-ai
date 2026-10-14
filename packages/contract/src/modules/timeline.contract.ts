import { oc } from "@orpc/contract";
import { z } from "zod";

export const timelineOverlaySchema = z.object({
  id: z.string(),
  type: z.enum(["text", "caption", "price", "cta"]),
  content: z.string(),
  startTime: z.number(),
  endTime: z.number(),
  style: z
    .object({
      fontSize: z.number().optional(),
      color: z.string().optional(),
      safeArea: z.boolean().optional(),
    })
    .optional(),
});

export const timelineSceneSchema = z.object({
  id: z.string(),
  durationSeconds: z.number(),
  videoAssetUrl: z.string(),
  isAiGenerated: z.boolean(),
  prompt: z.string().optional(),
  label: z.string().optional(),
});

export const canonicalTimelineSchema = z.object({
  version: z.string().default("1.0"),
  aspectRatio: z.literal("9:16").default("9:16"),
  resolution: z
    .object({
      width: z.number().default(1080),
      height: z.number().default(1920),
    })
    .default({ width: 1080, height: 1920 }),
  durationSeconds: z.number(),
  scenes: z.array(timelineSceneSchema),
  overlays: z.array(timelineOverlaySchema),
});

export const updateOverlaySchema = z.object({
  timelineId: z.string(),
  overlays: z.array(timelineOverlaySchema),
});

export type CanonicalTimeline = z.infer<typeof canonicalTimelineSchema>;
export type TimelineOverlay = z.infer<typeof timelineOverlaySchema>;
export type TimelineScene = z.infer<typeof timelineSceneSchema>;

export const timelineContract = {
  updateOverlays: oc
    .route({
      method: "PATCH",
      path: "/timeline/overlays",
      summary: "Update timeline overlays without video model re-run",
    })
    .input(updateOverlaySchema),
};
