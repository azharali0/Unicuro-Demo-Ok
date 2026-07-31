import { z } from "zod";

export const pushSubscriptionSchema = z.object({
  userId: z.string().min(1),
  endpoint: z.string().url(),
  keys: z.object({
    p256dh: z.string().min(1),
    auth: z.string().min(1),
  }),
  platform: z.string().optional(),
});

export const syncItemSchema = z.object({
  userId: z.string().min(1),
  action: z.string().min(2),
  payload: z.record(z.string(), z.unknown()).optional(),
});

export function shouldRetrySync(retryCount: number) {
  return retryCount < 5;
}

export function mobileInstallScore(input: { installed: boolean; pushEnabled: boolean; offlineReady: boolean }) {
  let score = 0;
  if (input.installed) score += 40;
  if (input.pushEnabled) score += 30;
  if (input.offlineReady) score += 30;
  return score;
}
