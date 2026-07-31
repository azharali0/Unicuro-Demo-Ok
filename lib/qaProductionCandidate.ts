import { z } from "zod";

export const testRunSchema = z.object({
  suite: z.enum(["Unit", "Integration", "E2E", "Regression", "Smoke", "API", "PWA", "Security"]),
  passed: z.number().min(0),
  failed: z.number().min(0),
  coverage: z.number().min(0).max(100),
});

export const accessibilityIssueSchema = z.object({
  area: z.string().min(2),
  wcag: z.string().min(2),
  severity: z.enum(["Low", "Medium", "High", "Critical"]),
  status: z.enum(["Open", "In Progress", "Resolved"]),
});

export const performanceMetricSchema = z.object({
  metric: z.enum(["LCP", "CLS", "INP", "TTFB", "API Latency", "DB Latency", "Queue Latency", "Cache Hit Rate"]),
  value: z.string().min(1),
  status: z.enum(["Healthy", "Watch", "Action"]),
});

export const uatFeedbackSchema = z.object({
  group: z.enum(["Students", "Universities", "Admins", "Support Team"]),
  feedback: z.string().min(2),
  severity: z.enum(["Low", "Medium", "High", "Critical"]),
  approved: z.boolean(),
});

export const releaseCandidateSchema = z.object({
  version: z.string().min(1),
  status: z.enum(["Draft", "Testing", "Approved", "Blocked", "Released"]),
  rollbackPlan: z.string().min(2),
});

export function testPassRate(passed: number, failed: number) {
  const total = passed + failed;
  if (!total) return 0;
  return Math.round((passed / total) * 100);
}

export function readinessBand(score: number) {
  if (score >= 95) return "Launch Ready";
  if (score >= 90) return "Production Candidate";
  if (score >= 80) return "Hardening Required";
  return "Not Ready";
}

export function performanceStatus(metric: string, numericValue: number) {
  if (metric === "LCP") return numericValue <= 2.5 ? "Healthy" : numericValue <= 4 ? "Watch" : "Action";
  if (metric === "CLS") return numericValue <= 0.1 ? "Healthy" : numericValue <= 0.25 ? "Watch" : "Action";
  if (metric === "INP") return numericValue <= 200 ? "Healthy" : numericValue <= 500 ? "Watch" : "Action";
  if (metric.includes("Latency")) return numericValue <= 250 ? "Healthy" : numericValue <= 750 ? "Watch" : "Action";
  return "Watch";
}

export function productionCandidateScore(scores: number[]) {
  if (!scores.length) return 0;
  return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
}
