import { useAppMutation } from "@repo/query";
import { client } from "../lib/orpc";

export function useCreateFactMutation() {
  return useAppMutation({
    mutationFn: (data: any) => client.facts.create(data),
    invalidateKeys: [["facts"]],
    successMessage: "Fact recorded with provenance",
    errorMessage: "Failed to record fact",
  });
}

export function useApproveFactMutation() {
  return useAppMutation({
    mutationFn: (data: any) => client.facts.approve(data),
    invalidateKeys: [["facts"]],
    successMessage: "Fact approval status updated",
    errorMessage: "Failed to update fact approval",
  });
}
