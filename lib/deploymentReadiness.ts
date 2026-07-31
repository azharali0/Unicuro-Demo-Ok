import { z } from "zod";

export const providerIntegrationSchema = z.object({
  provider: z.enum(["Stripe", "Resend", "OpenAI", "Twilio", "Sentry", "Database", "Storage", "Web Push", "Vercel"]),
  environment: z.enum(["Staging", "Production", "review"]),
  status: z.enum(["Not Started", "Configured", "Validated", "Blocked"]),
  owner: z.string().min(2),
});

export const pilotUniversitySchema = z.object({
  university: z.string().min(2),
  country: z.string().min(2),
  cohortSize: z.number().min(1),
  launchPhase: z.enum(["Discovery", "Onboarding", "Pilot Live", "Review", "Expansion"]),
});

export const rolloutGateSchema = z.object({
  gate: z.string().min(2),
  status: z.enum(["Passed", "Conditional", "Blocked"]),
  owner: z.string().min(2),
  blocker: z.string().optional(),
});

export function deploymentReadinessScore(items: { status: string }[]) {
  if (!items.length) return 0;
  const total = items.reduce((sum, item) => {
    if (["Validated", "Passed", "Configured"].includes(item.status)) return sum + 100;
    if (["Conditional", "Review", "In Progress"].includes(item.status)) return sum + 65;
    if (["Blocked", "Failed"].includes(item.status)) return sum + 15;
    return sum + 25;
  }, 0);
  return Math.round(total / items.length);
}

export function rolloutDecision(score: number) {
  if (score >= 95) return "Deploy";
  if (score >= 85) return "Pilot Ready";
  if (score >= 75) return "Conditional Pilot";
  return "Not Ready";
}

export function pilotHealth(activeUsers: number, targetUsers: number, supportTickets: number) {
  const adoption = targetUsers ? (activeUsers / targetUsers) * 100 : 0;
  if (adoption >= 65 && supportTickets < activeUsers * 0.05) return "Healthy";
  if (adoption >= 40) return "Watch";
  return "At Risk";
}
