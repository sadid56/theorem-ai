import { useState } from "react";
import { Container, Grid } from "@mui/material";
import { TheoremHeader } from "./components/theorem/TheoremHeader";
import { CostQuoterBanner } from "./components/theorem/CostQuoterBanner";
import { ProductIntakeCard, type ProductIntakeData } from "./components/theorem/ProductIntakeCard";
import { BuyerQuestionsCard, type BuyerQuestionItem } from "./components/theorem/BuyerQuestionsCard";
import { FactsApprovalCard, type FactItem } from "./components/theorem/FactsApprovalCard";
import { ScriptVariantsView, type ScriptVariantItem } from "./components/theorem/ScriptVariantsView";
import { TimelineEditorView } from "./components/theorem/TimelineEditorView";

const INITIAL_FACTS: FactItem[] = [
  {
    id: "fact_1",
    fieldName: "Casing Material",
    value: "Aerospace-grade 6061 aluminium alloy",
    sourceType: "seller_provided",
    approvalStatus: "approved",
  },
  {
    id: "fact_2",
    fieldName: "Drop Resistance",
    value: "Lab-tested shock absorption up to 3 meters",
    sourceType: "lab_test",
    approvalStatus: "approved",
  },
  {
    id: "fact_3",
    fieldName: "Water Resistance",
    value: "IP68 submersible up to 1.5 meters for 30 minutes",
    sourceType: "lab_test",
    approvalStatus: "approved",
  },
  {
    id: "fact_4",
    fieldName: "Warranty Guarantee",
    value: "30-day money-back guarantee with free replacements",
    sourceType: "seller_provided",
    approvalStatus: "approved",
  },
];

const INITIAL_QUESTIONS: BuyerQuestionItem[] = [
  {
    id: "q_1",
    question: "Does it genuinely protect the corners during high drops?",
    category: "durability",
  },
  {
    id: "q_2",
    question: "Is it too bulky for pocket carry?",
    category: "usability",
  },
  {
    id: "q_3",
    question: "What happens if water gets inside?",
    category: "protection",
  },
];

const INITIAL_VARIANTS: ScriptVariantItem[] = [
  {
    id: "variant_a",
    variantName: "Angle A: Direct Buyer Objection",
    hookText: '"Does it actually survive a 3-meter drop?" We tested it.',
    bodyText: "Built from aerospace-grade 6061 aluminium alloy with 3m lab-certified shock absorption.",
    ctaText: "Only $49 today. 30-day money-back guarantee.",
    claims: [
      { claim: "Aerospace-grade 6061 aluminium alloy", factId: "fact_1", verified: true },
      { claim: "Lab-tested shock absorption up to 3 meters", factId: "fact_2", verified: true },
    ],
    estimatedAiSeconds: 3.5,
  },
  {
    id: "variant_b",
    variantName: "Angle B: Feature Proof & Stress Test",
    hookText: "Stop buying flimsy cases that crack after one week.",
    bodyText: "Engineered with IP68 water sealing and military drop resistance that keeps your phone pristine.",
    ctaText: "Claim your special launch discount now.",
    claims: [
      { claim: "IP68 submersible", factId: "fact_3", verified: true },
      { claim: "Lab-tested shock absorption", factId: "fact_2", verified: true },
    ],
    estimatedAiSeconds: 4.0,
  },
  {
    id: "variant_c",
    variantName: "Angle C: FAQ Rapid-Answer",
    hookText: 'We answered your #1 question: "Is it too bulky for daily carry?"',
    bodyText: "Slim precision profile that fits comfortably anywhere, with zero compromise on protection.",
    ctaText: "Order today with free tracked shipping.",
    claims: [
      { claim: "30-day money-back guarantee", factId: "fact_4", verified: true },
    ],
    estimatedAiSeconds: 3.5,
  },
];

export function App() {
  const [productData, setProductData] = useState<ProductIntakeData>({
    name: "Apex Tactical Phone Armor",
    price: "49.00",
    currency: "$",
    productUrl: "https://example.com/products/apex-armor",
    category: "Accessories",
  });

  const [facts, setFacts] = useState<FactItem[]>(INITIAL_FACTS);
  const [questions, setQuestions] = useState<BuyerQuestionItem[]>(INITIAL_QUESTIONS);
  const [variants] = useState<ScriptVariantItem[]>(INITIAL_VARIANTS);
  const [selectedVariant, setSelectedVariant] = useState<ScriptVariantItem>(INITIAL_VARIANTS[0]!);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSavingOverlays, setIsSavingOverlays] = useState(false);
  const [videoUrl] = useState<string>("/sample-video.mp4");

  const handleProductChange = (field: keyof ProductIntakeData, value: string) => {
    setProductData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddQuestion = (qText: string) => {
    const newQ: BuyerQuestionItem = {
      id: `q_${Date.now()}`,
      question: qText,
      category: "general",
    };
    setQuestions((prev) => [...prev, newQ]);
  };

  const handleRemoveQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleToggleFactApproval = (id: string, approved: boolean) => {
    setFacts((prev) =>
      prev.map((f) =>
        f.id === id
          ? { ...f, approvalStatus: approved ? "approved" : "rejected" }
          : f,
      ),
    );
  };

  const handleGenerateBatch = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 1200);
  };

  const handleSaveOverlays = (overlays: { hook: string; cta: string }) => {
    setIsSavingOverlays(true);
    setTimeout(() => {
      setSelectedVariant((prev) => ({
        ...prev,
        hookText: overlays.hook,
        ctaText: overlays.cta,
      }));
      setIsSavingOverlays(false);
    }, 600);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <TheoremHeader />
      <CostQuoterBanner />

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <ProductIntakeCard
            data={productData}
            onChange={handleProductChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <BuyerQuestionsCard
            questions={questions}
            onAddQuestion={handleAddQuestion}
            onRemoveQuestion={handleRemoveQuestion}
          />
        </Grid>
      </Grid>

      <FactsApprovalCard
        facts={facts}
        onToggleApproval={handleToggleFactApproval}
      />

      <ScriptVariantsView
        variants={variants}
        isGenerating={isGenerating}
        onGenerateBatch={handleGenerateBatch}
        onSelectVariant={setSelectedVariant}
        selectedVariantId={selectedVariant?.id}
      />

      {selectedVariant && (
        <TimelineEditorView
          variant={selectedVariant}
          videoUrl={videoUrl}
          onSaveOverlays={handleSaveOverlays}
          isSavingOverlays={isSavingOverlays}
        />
      )}
    </Container>
  );
}

export default App;
