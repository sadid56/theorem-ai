export interface VideoGenParams {
  prompt: string;
  durationSeconds: number;
  resolution?: "720p" | "1080p";
  draftMode?: boolean;
  referenceImageUrl?: string;
}

export interface VideoGenResult {
  jobId: string;
  status: "completed" | "processing" | "failed";
  videoUrl?: string;
  durationSeconds: number;
  costIncurred: number;
  error?: string;
}

export interface VideoProvider {
  name: string;
  generateVideo(params: VideoGenParams): Promise<VideoGenResult>;
  getJobStatus(jobId: string): Promise<VideoGenResult>;
  calculateEstimatedCost(seconds: number, draftMode?: boolean): number;
}
