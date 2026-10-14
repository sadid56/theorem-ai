import { productsContract } from "./modules/products.contract";
import { factsContract } from "./modules/facts.contract";
import { questionsContract } from "./modules/questions.contract";
import { scriptsContract } from "./modules/scripts.contract";
import { timelineContract } from "./modules/timeline.contract";
import { jobsContract } from "./modules/jobs.contract";

export * from "./modules/products.contract";
export * from "./modules/facts.contract";
export * from "./modules/questions.contract";
export * from "./modules/scripts.contract";
export * from "./modules/timeline.contract";
export * from "./modules/jobs.contract";

export const appContract = {
  products: productsContract,
  facts: factsContract,
  questions: questionsContract,
  scripts: scriptsContract,
  timeline: timelineContract,
  jobs: jobsContract,
};

export type { ContractRouterClient } from "@orpc/contract";
export { oc } from "@orpc/contract";

export type AppContract = typeof appContract;
