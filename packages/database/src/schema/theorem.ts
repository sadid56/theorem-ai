import { pgTable, text, timestamp, boolean, integer, numeric, jsonb } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: numeric("price", { precision: 10, scale: 2 }),
  currency: text("currency").default("USD").notNull(),
  productUrl: text("product_url"),
  category: text("category").default("general").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const productFacts = pgTable("product_facts", {
  id: text("id").primaryKey(),
  productId: text("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  fieldName: text("field_name").notNull(),
  value: text("value").notNull(),
  sourceType: text("source_type").notNull(),
  sourceUrl: text("source_url"),
  approvalStatus: text("approval_status").default("pending").notNull(),
  approvedAt: timestamp("approved_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const buyerQuestions = pgTable("buyer_questions", {
  id: text("id").primaryKey(),
  productId: text("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  question: text("question").notNull(),
  category: text("category").default("general").notNull(),
  priority: integer("priority").default(1).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const videoBriefs = pgTable("video_briefs", {
  id: text("id").primaryKey(),
  productId: text("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  targetAngle: text("target_angle").notNull(),
  status: text("status").default("draft").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const scriptVariants = pgTable("script_variants", {
  id: text("id").primaryKey(),
  briefId: text("brief_id")
    .notNull()
    .references(() => videoBriefs.id, { onDelete: "cascade" }),
  variantName: text("variant_name").notNull(),
  hookText: text("hook_text").notNull(),
  bodyText: text("body_text").notNull(),
  ctaText: text("cta_text").notNull(),
  claimsJson: jsonb("claims_json").$type<Array<{ claim: string; factId: string }>>().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const timelineProjects = pgTable("timeline_projects", {
  id: text("id").primaryKey(),
  briefId: text("brief_id")
    .notNull()
    .references(() => videoBriefs.id, { onDelete: "cascade" }),
  variantId: text("variant_id")
    .notNull()
    .references(() => scriptVariants.id, { onDelete: "cascade" }),
  timelineJson: jsonb("timeline_json").notNull(),
  version: integer("version").default(1).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const generationJobs = pgTable("generation_jobs", {
  id: text("id").primaryKey(),
  briefId: text("brief_id").notNull(),
  variantId: text("variant_id"),
  status: text("status").default("queued").notNull(),
  provider: text("provider").default("p-video").notNull(),
  estimatedCost: numeric("estimated_cost", { precision: 10, scale: 4 }).default("0.0000"),
  actualCost: numeric("actual_cost", { precision: 10, scale: 4 }).default("0.0000"),
  outputUrl: text("output_url"),
  error: text("error"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
