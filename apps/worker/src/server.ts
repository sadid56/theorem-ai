import fastify, { type FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import { JobProcessor } from "./jobs/job-processor";
import { ScriptGenerator } from "./agents/script-generator";
import { ClaimVerifier } from "./agents/claim-verifier";
import type { CanonicalTimeline, TimelineOverlay } from "./types/timeline";

export function buildWorkerServer(): FastifyInstance {
  const app = fastify({ logger: false });
  const processor = new JobProcessor();

  app.register(cors, { origin: "*" });

  app.get("/health", async () => ({
    status: "healthy",
    service: "theorem-worker",
    timestamp: new Date().toISOString(),
  }));

  app.post("/agents/script-variants", async (req) => {
    const body = req.body as any;
    const variants = ScriptGenerator.generateThreeVariants({
      productName: body.productName,
      price: body.price,
      currency: body.currency,
      facts: body.facts || [],
      questions: body.questions || [],
      targetAngle: body.targetAngle,
    });

    const validatedVariants = variants.map((v) => {
      const verification = ClaimVerifier.verifyScriptClaims(v.claims, body.facts || []);
      return {
        ...v,
        claims: verification.approvedMappings.map((m) => ({
          ...m,
          verified: true,
        })),
        isCompliant: verification.valid,
      };
    });

    return { variants: validatedVariants };
  });

  app.post("/jobs/generate", async (req) => {
    const body = req.body as any;
    const result = await processor.executeFullGeneration({
      jobId: body.jobId || `job_${Date.now()}`,
      briefId: body.briefId || "brief_1",
      variant: body.variant,
      providerType: body.providerType || "mock",
      existingProofFootageUrl: body.existingProofFootageUrl,
    });
    return result;
  });

  app.post("/jobs/compose-overlays", async (req) => {
    const body = req.body as {
      timeline: CanonicalTimeline;
      overlays: TimelineOverlay[];
    };
    const updated = await processor.executeOverlayRecomposition(
      body.timeline,
      body.overlays,
    );
    return {
      success: true,
      timeline: updated,
      modelCallsIncurred: 0,
      message: "Overlays updated without calling generative video models",
    };
  });

  return app;
}
