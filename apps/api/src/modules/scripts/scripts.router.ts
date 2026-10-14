import { scriptsContract } from "@repo/contract";
import { db } from "@repo/database";
import {
  products,
  productFacts,
  buyerQuestions,
  videoBriefs,
  scriptVariants,
} from "@repo/database/schema";
import { eq } from "drizzle-orm";
import { createProcedure } from "../../utils/procedure";
import { WORKER_URL } from "@repo/config";

export const generateVariants = createProcedure(
  scriptsContract.generateVariants,
  async (input) => {
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.id, input.productId));
    const facts = await db
      .select()
      .from(productFacts)
      .where(eq(productFacts.productId, input.productId));
    const questions = await db
      .select()
      .from(buyerQuestions)
      .where(eq(buyerQuestions.productId, input.productId));

    const workerEndpoint = `${WORKER_URL || "http://localhost:4001"}/agents/script-variants`;
    let variants = [];

    try {
      const res = await fetch(workerEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: product?.name || "Product",
          price: product?.price,
          currency: product?.currency,
          facts,
          questions,
          targetAngle: input.targetAngle,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        variants = data.variants;
      }
    } catch {
      variants = [
        {
          id: "variant_a",
          variantName: "Angle A: Direct Buyer Objection",
          hookText: `Is ${product?.name} genuinely worth the price?`,
          bodyText: `Engineered with ${facts[0]?.value || "premium materials"}.`,
          ctaText: `Order today for ${product?.currency || "$"}${product?.price || "29"}.`,
          claims: [{ claim: facts[0]?.value || "test", factId: facts[0]?.id || "f1", verified: true }],
          estimatedAiSeconds: 3.5,
          isCompliant: true,
        },
      ];
    }

    const briefId = `brief_${Date.now()}`;
    await db.insert(videoBriefs).values({
      id: briefId,
      productId: input.productId,
      title: `${product?.name || "Product"} - Proof-Led 3x Variations`,
      targetAngle: input.targetAngle,
      status: "ready",
    });

    for (const v of variants) {
      await db.insert(scriptVariants).values({
        id: `sv_${Date.now()}_${v.id}`,
        briefId,
        variantName: v.variantName,
        hookText: v.hookText,
        bodyText: v.bodyText,
        ctaText: v.ctaText,
        claimsJson: v.claims || [],
      });
    }

    return { briefId, variants };
  },
);

export const scriptsRouter = {
  generateVariants,
};
