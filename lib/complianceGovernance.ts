import { z } from "zod";

export type ComplianceRegion = "UK" | "EU" | "US" | "Canada" | "Nigeria" | "India" | "Global";
export type DataSubjectRequestType = "Access" | "Delete" | "Correct" | "Export" | "Restrict Processing" | "Withdraw Consent";

export const consentRecordSchema = z.object({
  userId: z.string().min(1),
  category: z.enum(["Necessary", "Analytics", "Marketing", "Personalisation", "AI Processing", "Partner Sharing"]),
  granted: z.boolean(),
  region: z.string().min(2),
  policyVersion: z.string().min(1),
});

export const dsarRequestSchema = z.object({
  userId: z.string().min(1),
  requestType: z.enum(["Access", "Delete", "Correct", "Export", "Restrict Processing", "Withdraw Consent"]),
  region: z.string().min(2),
  notes: z.string().optional(),
});

export const dataRetentionPolicySchema = z.object({
  dataCategory: z.string().min(2),
  retentionDays: z.number().min(1),
  lawfulBasis: z.string().min(2),
  region: z.string().min(2),
});

export const processingActivitySchema = z.object({
  activity: z.string().min(2),
  purpose: z.string().min(2),
  lawfulBasis: z.string().min(2),
  dataCategories: z.array(z.string()).min(1),
  processors: z.array(z.string()).optional(),
  region: z.string().min(2),
});

export function dsarDueDate(days = 30) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

export function complianceScore(items: { status: string; risk?: string }[]) {
  if (!items.length) return 0;
  const score = items.reduce((sum, item) => {
    let points = 50;
    if (["Compliant", "Approved", "Resolved", "Active"].includes(item.status)) points = 100;
    if (["Review", "scheduled", "In Progress"].includes(item.status)) points = 65;
    if (["Action Needed", "Overdue", "Failed", "Blocked"].includes(item.status)) points = 20;
    if (item.risk === "High") points -= 15;
    if (item.risk === "Medium") points -= 5;
    return sum + Math.max(points, 0);
  }, 0);
  return Math.round(score / items.length);
}

export function requiresDpia(activity: { includesAI?: boolean; includesSensitiveData?: boolean; largeScale?: boolean }) {
  return Boolean(activity.includesAI || activity.includesSensitiveData || activity.largeScale);
}

export function lawfulBasisFor(category: string) {
  const normalized = category.toLowerCase();
  if (normalized.includes("marketing")) return "Consent";
  if (normalized.includes("payment")) return "Contract";
  if (normalized.includes("security")) return "Legitimate Interest";
  if (normalized.includes("wellbeing")) return "Explicit Consent / Vital Interest where appropriate";
  return "Legitimate Interest";
}
