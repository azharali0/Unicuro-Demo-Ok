import webpush from "web-push";
import { prisma } from "@/lib/prisma";

if (process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || "mailto:support@unicuro.app",
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
}

export async function savePushSubscription(input: {
  userId: string;
  endpoint: string;
  p256dh: string;
  auth: string;
  userAgent?: string;
}) {
  return prisma.pushSubscription.upsert({
    where: { endpoint: input.endpoint },
    update: { userId: input.userId, p256dh: input.p256dh, auth: input.auth, userAgent: input.userAgent, active: true },
    create: input,
  });
}

export async function sendPushToUser(userId: string, payload: { title: string; body: string; url?: string }) {
  const subscriptions = await prisma.pushSubscription.findMany({ where: { userId, active: true } });
  const results = [];
  for (const sub of subscriptions) {
    try {
      const result = await webpush.sendNotification(
        { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } } as any,
        JSON.stringify(payload)
      );
      results.push({ endpoint: sub.endpoint, ok: true, statusCode: result.statusCode });
    } catch (error) {
      await prisma.pushSubscription.update({ where: { id: sub.id }, data: { active: false } });
      results.push({ endpoint: sub.endpoint, ok: false });
    }
  }
  return results;
}
