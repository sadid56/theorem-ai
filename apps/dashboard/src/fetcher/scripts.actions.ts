import { useAppMutation } from "@repo/query";
import { client } from "../lib/orpc";

export function useGenerateVariantsMutation() {
  return useAppMutation({
    mutationFn: (data: any) => client.scripts.generateVariants(data),
    invalidateKeys: [["scripts", "variants"]],
    successMessage: "3x ad variations generated",
    errorMessage: "Failed to generate variations",
  });
}
