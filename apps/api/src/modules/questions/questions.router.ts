import { questionsContract } from "@repo/contract";
import { db } from "@repo/database";
import { buyerQuestions } from "@repo/database/schema";
import { createProcedure } from "../../utils/procedure";

export const importQuestions = createProcedure(
  questionsContract.import,
  async (input) => {
    const inserted = [];
    for (const q of input.questions) {
      const id = `bq_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
      const [record] = await db
        .insert(buyerQuestions)
        .values({
          id,
          productId: input.productId,
          question: q.question,
          category: q.category || "general",
          priority: q.priority || 1,
        })
        .returning();
      inserted.push(record);
    }
    return { count: inserted.length, questions: inserted };
  },
);

export const questionsRouter = {
  import: importQuestions,
};
