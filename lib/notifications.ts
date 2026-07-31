import { prisma } from "@/lib/prisma";
import { sendTemplatedEmail } from "@/lib/emailWorkflow";
import { sendPushToUser } from "@/lib/pushNotifications";

export type NotificationPayload = {
  userId: string;
  title: string;
  body: string;
  channel: "IN_APP" | "EMAIL" | "PUSH";
  email?: string;
};

export async function createInAppNotification(payload: NotificationPayload) {
  const notification = await prisma.notification.create({
    data: { userId: payload.userId, title: payload.title, body: payload.body, category: "ALERT" },
  });
  return { ok: true, notification };
}

export async function sendEmailNotification(payload: NotificationPayload) {
  if (!payload.email) return { ok: false, reason: "EMAIL_REQUIRED" };
  const delivery = await sendTemplatedEmail({
    userId: payload.userId,
    toEmail: payload.email,
    templateKey: "alert",
    args: [payload.title, payload.body],
  });
  return { ok: delivery.status === "SENT", delivery };
}

export async function sendPushNotification(payload: NotificationPayload) {
  const notification = await prisma.notification.create({
    data: { userId: payload.userId, title: payload.title, body: payload.body, category: "ALERT" },
  });
  const pushResults = await sendPushToUser(payload.userId, { title: payload.title, body: payload.body });
  return { ok: true, notification, pushResults };
}
