import { useAppMutation } from "@repo/query";
import { client } from "../lib/orpc";

export function useRenderJobMutation() {
  return useAppMutation({
    mutationFn: (data: any) => client.jobs.render(data),
    successMessage: "Ad batch rendered successfully",
    errorMessage: "Failed to render video batch",
  });
}
