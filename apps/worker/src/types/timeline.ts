export interface TimelineScene {
  id: string;
  durationSeconds: number;
  videoAssetUrl: string;
  isAiGenerated: boolean;
  prompt?: string;
  label?: string;
}

export interface TimelineOverlay {
  id: string;
  type: "text" | "caption" | "price" | "cta";
  content: string;
  startTime: number;
  endTime: number;
  style?: {
    fontSize?: number;
    color?: string;
    safeArea?: boolean;
  };
}

export interface CanonicalTimeline {
  version: string;
  aspectRatio: "9:16";
  resolution: { width: number; height: number };
  durationSeconds: number;
  scenes: TimelineScene[];
  overlays: TimelineOverlay[];
}

export interface ScriptClaim {
  claim: string;
  factId: string;
  verified: boolean;
}

export interface ScriptVariant {
  id: string;
  variantName: string;
  hookText: string;
  bodyText: string;
  ctaText: string;
  claims: ScriptClaim[];
  estimatedAiSeconds: number;
}
