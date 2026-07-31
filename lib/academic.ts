import { z } from "zod";

export const studyAssetSchema = z.object({
  userId: z.string().min(1),
  title: z.string().min(2),
  type: z.string().min(2),
  module: z.string().min(2),
});

export const quizSubmissionSchema = z.object({
  userId: z.string().min(1),
  quiz: z.string().min(2),
  module: z.string().min(2),
  answers: z.array(z.string()),
});

export function estimateReadiness(scores: number[]) {
  if (!scores.length) return 0;
  return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
}

export function identifyWeakAreas(results: { topic: string; correct: boolean }[]) {
  return results.filter((result) => !result.correct).map((result) => result.topic);
}
