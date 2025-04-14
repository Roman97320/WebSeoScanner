import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// SEO Analysis Schema
export const seoAnalyses = pgTable("seo_analyses", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  overallScore: integer("overall_score").notNull(),
  passedCount: integer("passed_count").notNull(),
  warningCount: integer("warning_count").notNull(),
  criticalCount: integer("critical_count").notNull(),
  executiveSummary: jsonb("executive_summary").notNull(),
  seoElements: jsonb("seo_elements").notNull(),
  serp: jsonb("serp").notNull(),
  social: jsonb("social").notNull(),
  favicon: text("favicon"),
  html: text("html"),
});

export const insertSeoAnalysisSchema = createInsertSchema(seoAnalyses)
  .omit({ id: true });

export type InsertSeoAnalysis = z.infer<typeof insertSeoAnalysisSchema>;
export type SeoAnalysis = typeof seoAnalyses.$inferSelect;

// URL Analysis Request Schema
export const urlRequestSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
});

export type UrlRequest = z.infer<typeof urlRequestSchema>;
