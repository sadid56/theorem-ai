import { oc } from "@orpc/contract";
import { z } from "zod";

export const createFactSchema = z.object({
  productId: z.string(),
  fieldName: z.string(),
  value: z.string(),
  sourceType: z.enum(["seller_provided", "scraped", "test_report", "manual"]),
  sourceUrl: z.string().optional(),
});

export const approveFactSchema = z.object({
  factId: z.string(),
  approved: z.boolean(),
});

export const factsContract = {
  create: oc
    .route({
      method: "POST",
      path: "/facts",
      summary: "Add fact record with provenance",
    })
    .input(createFactSchema),
  approve: oc
    .route({
      method: "PATCH",
      path: "/facts/approve",
      summary: "Approve or reject a fact claim",
    })
    .input(approveFactSchema),
};
