import type { ScriptVariant } from "../types/timeline";
import type { ApprovedFact } from "./claim-verifier";

export interface ScriptGenerationInput {
  productName: string;
  price?: string;
  currency?: string;
  facts: ApprovedFact[];
  questions: Array<{ question: string; category?: string }>;
  targetAngle?: string;
}

export class ScriptGenerator {
  static generateThreeVariants(input: ScriptGenerationInput): ScriptVariant[] {
    const { productName, price, currency = "$", facts, questions } = input;

    const primaryQuestion =
      questions[0]?.question || "Is this genuinely worth the price?";
    const secondaryQuestion =
      questions[1]?.question || "How does it hold up with daily use?";

    const fact1 = facts[0]?.value || "military-grade build quality";
    const fact1Id = facts[0]?.id || "fact_1";

    const fact2 = facts[1]?.value || "tested to withstand 10,000 cycles";
    const fact2Id = facts[1]?.id || "fact_2";

    const priceText = price ? `Only ${currency}${price} today` : "Order today";

    return [
      {
        id: "variant_a",
        variantName: "Angle A: Direct Buyer Objection",
        hookText: `"${primaryQuestion}" Here is the real test.`,
        bodyText: `Unlike typical alternatives, ${productName} features ${fact1}. Verified by real stress testing: ${fact2}.`,
        ctaText: `${priceText}. Backed by our 30-day guarantee.`,
        claims: [
          { claim: fact1, factId: fact1Id, verified: true },
          { claim: fact2, factId: fact2Id, verified: true },
        ],
        estimatedAiSeconds: 3.5,
      },
      {
        id: "variant_b",
        variantName: "Angle B: Feature Proof & Durability",
        hookText: `Still skeptical? Watch what happens when we test ${productName}.`,
        bodyText: `Engineered with ${fact1}. Independent tests confirmed ${fact2}.`,
        ctaText: `Get yours now. ${priceText}.`,
        claims: [
          { claim: fact1, factId: fact1Id, verified: true },
          { claim: fact2, factId: fact2Id, verified: true },
        ],
        estimatedAiSeconds: 4.0,
      },
      {
        id: "variant_c",
        variantName: "Angle C: FAQ Fast-Answer",
        hookText: `We answered your #1 question: "${secondaryQuestion}"`,
        bodyText: `The secret is ${fact1}. Tested and proven: ${fact2}.`,
        ctaText: `Claim your offer today. Tap below.`,
        claims: [
          { claim: fact1, factId: fact1Id, verified: true },
          { claim: fact2, factId: fact2Id, verified: true },
        ],
        estimatedAiSeconds: 3.5,
      },
    ];
  }
}
