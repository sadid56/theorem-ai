import { productsRouter } from "./modules/products/products.router";
import { factsRouter } from "./modules/facts/facts.router";
import { questionsRouter } from "./modules/questions/questions.router";
import { scriptsRouter } from "./modules/scripts/scripts.router";
import { timelineRouter } from "./modules/timeline/timeline.router";
import { jobsRouter } from "./modules/jobs/jobs.router";

export const appRouter = {
  products: productsRouter,
  facts: factsRouter,
  questions: questionsRouter,
  scripts: scriptsRouter,
  timeline: timelineRouter,
  jobs: jobsRouter,
};

export type AppRouter = typeof appRouter;
