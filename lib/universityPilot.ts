import { z } from "zod";

export const pilotUniversitySchema = z.object({
  university: z.string().min(2),
  country: z.string().min(2),
  pilotOwner: z.string().min(2),
  cohortSize: z.number().min(1),
  startDate: z.string().min(8),
  phase: z.enum(["Onboarding", "Activation", "Live Pilot", "Review", "Expansion"]),
});

export const pilotFeedbackSchema = z.object({
  universityId: z.string().min(1),
  group: z.enum(["Student", "Admin", "University Staff", "Support"]),
  rating: z.number().min(1).max(10),
  feedback: z.string().min(2),
  severity: z.enum(["Low", "Medium", "High", "Critical"]),
});

export const pilotMetricSchema = z.object({
  universityId: z.string().min(1),
  activeUsers: z.number().min(0),
  totalInvited: z.number().min(1),
  weeklyRetention: z.number().min(0).max(100),
  supportTickets: z.number().min(0),
});

export function activationRate(activeUsers: number, totalInvited: number) {
  if (!totalInvited) return 0;
  return Math.round((activeUsers / totalInvited) * 100);
}

export function pilotHealth(input: {
  activationRate: number;
  weeklyRetention: number;
  supportTicketRate: number;
}) {
  if (input.activationRate >= 60 && input.weeklyRetention >= 45 && input.supportTicketRate <= 8) return "Healthy";
  if (input.activationRate >= 40 && input.weeklyRetention >= 30) return "Watch";
  return "At Risk";
}

export function pilotReadinessScore(scores: number[]) {
  if (!scores.length) return 0;
  return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
}
