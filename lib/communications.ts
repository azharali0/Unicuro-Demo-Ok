import { z } from "zod";

export const notificationSchema = z.object({
  userId: z.string().min(1),
  title: z.string().min(2),
  body: z.string().min(2),
  category: z.string().min(2),
  actionUrl: z.string().optional(),
});

export const supportMessageSchema = z.object({
  conversationId: z.string().optional(),
  userId: z.string().min(1),
  message: z.string().min(1),
});

export const campaignSchema = z.object({
  name: z.string().min(2),
  channel: z.enum(["Email", "Push", "In-App", "SMS"]),
  audience: z.string().min(2),
});

export function groupSmartAlerts(alerts: { priority: string; title: string }[]) {
  const high = alerts.filter((alert) => alert.priority === "High" || alert.priority === "Critical");
  const normal = alerts.filter((alert) => alert.priority !== "High" && alert.priority !== "Critical");

  return {
    sendNow: high,
    digest: normal,
    summary: `${high.length} urgent alert(s), ${normal.length} grouped into digest.`,
  };
}

export function shouldSuppressNotification(category: string, quietHours = false) {
  if (category === "Security") return false;
  return quietHours;
}
