import { oc } from "@orpc/contract";
import { z } from "zod";

export const importQuestionsSchema = z.object({
  productId: z.string(),
  questions: z.array(
    z.object({
      question: z.string().min(3),
      category: z.string().optional(),
      priority: z.number().int().min(1).max(5).default(1),
    }),
  ),
});

export const questionsContract = {
  import: oc
    .route({
      method: "POST",
      path: "/questions/import",
      summary: "Import buyer questions",
    })
    .input(importQuestionsSchema),
};
