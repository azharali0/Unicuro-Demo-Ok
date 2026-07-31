import { prisma } from "@/lib/prisma";

export async function getNotificationPreference(userId: string) {
  return prisma.notificationPreference.upsert({
    where: { userId },
    update: {},
    create: { userId },
  });
}

export async function updateNotificationPreference(userId: string, data: Partial<{ email: boolean; push: boolean; inApp: boolean; sms: boolean; marketing: boolean; academic: boolean; finance: boolean; wellbeing: boolean; community: boolean }>) {
  return prisma.notificationPreference.upsert({
    where: { userId },
    update: data,
    create: { userId, ...data },
  });
}

export async function scheduleNotification(input: { userId?: string; segment?: string; title: string; body: string; channel: string; scheduledAt: Date }) {
  return prisma.scheduledNotification.create({ data: input });
}

export async function recordNotificationDelivery(input: { notificationId?: string; scheduledId?: string; userId?: string; channel: string; status: string; providerId?: string; error?: string }) {
  return prisma.notificationDelivery.create({ data: input });
}
