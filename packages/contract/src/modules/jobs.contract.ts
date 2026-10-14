import { oc } from "@orpc/contract";
import { z } from "zod";

export const renderJobSchema = z.object({
  briefId: z.string(),
  variantId: z.string(),
  provider: z.enum(["p-video", "wan2.1", "mock"]).default("p-video"),
});

export const jobsContract = {
  render: oc
    .route({
      method: "POST",
      path: "/jobs/render",
      summary: "Dispatch video generation and composition job",
    })
    .input(renderJobSchema),
};
