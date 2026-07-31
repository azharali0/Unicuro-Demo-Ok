import { z } from "zod";

export const moodCheckInSchema = z.object({
  userId: z.string().min(1),
  mood: z.enum(["Great", "Good", "Okay", "Stressed", "Low"]),
  stressLevel: z.number().min(1).max(10),
  sleepHours: z.number().min(0).max(24),
  note: z.string().optional(),
});

export function burnoutRiskScore(input: { stressLevel: number; sleepHours: number; deadlineCount: number }) {
  let score = input.stressLevel * 8;
  if (input.sleepHours < 6) score += 20;
  if (input.deadlineCount >= 2) score += 20;
  return Math.min(score, 100);
}

export function wellbeingPriority(score: number) {
  if (score >= 75) return "High";
  if (score >= 45) return "Medium";
  return "Low";
}
