import { factsContract } from "@repo/contract";
import { db } from "@repo/database";
import { productFacts } from "@repo/database/schema";
import { eq } from "drizzle-orm";
import { createProcedure } from "../../utils/procedure";

export const createFact = createProcedure(
  factsContract.create,
  async (input) => {
    const id = `fact_${Date.now()}`;
    const [fact] = await db
      .insert(productFacts)
      .values({
        id,
        productId: input.productId,
        fieldName: input.fieldName,
        value: input.value,
        sourceType: input.sourceType,
        sourceUrl: input.sourceUrl,
        approvalStatus: "pending",
      })
      .returning();
    return fact;
  },
);

export const approveFact = createProcedure(
  factsContract.approve,
  async (input) => {
    const [updated] = await db
      .update(productFacts)
      .set({
        approvalStatus: input.approved ? "approved" : "rejected",
        approvedAt: input.approved ? new Date() : null,
      })
      .where(eq(productFacts.id, input.factId))
      .returning();
    return updated;
  },
);

export const factsRouter = {
  create: createFact,
  approve: approveFact,
};
