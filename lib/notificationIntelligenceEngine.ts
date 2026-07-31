import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/emailProvider";
import { sendSms } from "@/lib/smsProvider";
import { sendPush } from "@/lib/pushProvider";

export async function buildNotificationDigest(userId: string, periodStart: Date, periodEnd: Date) {
  const notifications = await prisma.notification.findMany({
    where: { userId, createdAt: { gte: periodStart, lte: periodEnd } },
    orderBy: { createdAt: "desc" },
  });
  const digest = await prisma.notificationDigest.create({
    data: { userId, channel: "IN_APP", periodStart, periodEnd, content: notifications },
  });
  return digest;
}

export async function dispatchNotification(userId: string, input: {
  title: string;
  body: string;
  email?: string;
  phone?: string;
  channels: Array<"IN_APP" | "EMAIL" | "SMS" | "PUSH">;
}) {
  const notification = await prisma.notification.create({
    data: { userId, title: input.title, body: input.body, category: "SYSTEM", read: false },
  });

  const results: any[] = [];
  if (input.channels.includes("EMAIL") && input.email) {
    results.push(await sendEmail({ userId, to: input.email, subject: input.title, html: `<p>${input.body}</p>`, templateKey: "SYSTEM_NOTIFICATION" }));
  }
  if (input.channels.includes("SMS") && input.phone) {
    results.push(await sendSms({ userId, to: input.phone, body: input.body, templateKey: "SYSTEM_NOTIFICATION" }));
  }
  if (input.channels.includes("PUSH")) {
    results.push(await sendPush(userId, { title: input.title, body: input.body }));
  }
  return { notification, results };
}
