import { oc } from "@orpc/contract";
import { z } from "zod";

export const generateVariantsSchema = z.object({
  productId: z.string(),
  targetAngle: z.string().default("proof-led"),
});

export const scriptsContract = {
  generateVariants: oc
    .route({
      method: "POST",
      path: "/scripts/generate-variants",
      summary: "Generate 3 proof-led script variations",
    })
    .input(generateVariantsSchema),
};
