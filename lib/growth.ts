import { z } from "zod";

export const waitlistSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  country: z.string().min(2),
  university: z.string().optional(),
  source: z.string().min(2),
});

export const campaignSchema = z.object({
  name: z.string().min(2),
  channel: z.enum(["TikTok", "Instagram", "Email", "SEO", "Campus", "Partner"]),
  target: z.string().min(2),
});

export function referralRewardEligible(invites: number, activated: number) {
  return invites >= 3 && activated >= 1;
}

export function growthScore(input: { visits: number; conversions: number }) {
  if (!input.visits) return 0;
  return Math.round((input.conversions / input.visits) * 10000) / 100;
}
