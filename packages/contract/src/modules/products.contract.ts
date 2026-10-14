import { oc } from "@orpc/contract";
import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  price: z.string().optional(),
  currency: z.string().default("USD"),
  productUrl: z.string().url().optional(),
  category: z.string().default("general"),
});

export const productsContract = {
  create: oc
    .route({
      method: "POST",
      path: "/products",
      summary: "Create product brief",
    })
    .input(createProductSchema),
  list: oc
    .route({
      method: "GET",
      path: "/products",
      summary: "List all products",
    }),
};
