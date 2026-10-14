import type {
  VideoProvider,
  VideoGenParams,
  VideoGenResult,
} from "./video-provider.interface";

export class MockVideoProvider implements VideoProvider {
  name = "mock-p-video";

  calculateEstimatedCost(seconds: number, draftMode?: boolean): number {
    const ratePerSecond = draftMode ? 0.01 : 0.04;
    return Number((seconds * ratePerSecond).toFixed(4));
  }

  async generateVideo(params: VideoGenParams): Promise<VideoGenResult> {
    const cost = this.calculateEstimatedCost(params.durationSeconds, params.draftMode);
    const mockId = `mock_vid_${Date.now()}`;
    return {
      jobId: mockId,
      status: "completed",
      videoUrl: "/sample-video.mp4",
      durationSeconds: params.durationSeconds,
      costIncurred: cost,
    };
  }

  async getJobStatus(jobId: string): Promise<VideoGenResult> {
    return {
      jobId,
      status: "completed",
      videoUrl: "/sample-video.mp4",
      durationSeconds: 3.5,
      costIncurred: 0.14,
    };
  }
}
