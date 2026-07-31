import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  universityEmail: z.string().email().optional(),
  countryCode: z.string().min(2).max(3),
  universityId: z.string().min(1).optional(),
});

export const otpSchema = z.object({
  identifier: z.string().min(5),
  code: z.string().min(4).max(8),
});

export function scoreSignupRisk(input: { email: string; countryCode?: string; deviceRisk?: "Low" | "Medium" | "High" }) {
  let score = 10;
  const domain = input.email.split("@")[1]?.toLowerCase() ?? "";

  if (["maildrop.test", "tempmail.com", "example.com"].includes(domain)) score += 55;
  if (input.deviceRisk === "Medium") score += 20;
  if (input.deviceRisk === "High") score += 45;
  if (!input.countryCode) score += 10;

  return Math.min(score, 100);
}

export function verificationCompletion(checks: { status: string }[]) {
  if (!checks.length) return 0;
  const verified = checks.filter((check) => check.status === "Verified").length;
  return Math.round((verified / checks.length) * 100);
}

export function identityTier(score: number) {
  if (score >= 820) return "Elite";
  if (score >= 700) return "Trusted";
  if (score >= 560) return "Reliable";
  return "Starter";
}
