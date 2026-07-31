import webpush from "web-push";
import { prisma } from "@/lib/prisma";

function configure() {
  const subject = process.env.VAPID_SUBJECT;
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  if (!subject || !publicKey || !privateKey) throw new Error("WEB_PUSH_NOT_CONFIGURED");
  webpush.setVapidDetails(subject, publicKey, privateKey);
}

export async function sendPush(userId: string, payload: any) {
  configure();
  const subscriptions = await prisma.pushSubscription.findMany({ where: { userId, active: true } });
  const results = [];
  for (const sub of subscriptions) {
    try {
      const response = await webpush.sendNotification({ endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } }, JSON.stringify(payload));
      results.push({ id: sub.id, ok: true, statusCode: response.statusCode });
    } catch (error: any) {
      results.push({ id: sub.id, ok: false, error: String(error?.message || error) });
      if (error?.statusCode === 404 || error?.statusCode === 410) {
        await prisma.pushSubscription.update({ where: { id: sub.id }, data: { active: false } });
      }
    }
  }
  return results;
}
