import { recordApiRequest } from "@/lib/apiDatabase";
import { z } from "zod";
import { requireRole } from "@/lib/session";
import { getNotificationPreference, updateNotificationPreference } from "@/lib/notificationPreferenceEngine";
import { ok } from "@/lib/http";

const schema = z.object({
  email: z.boolean().optional(),
  push: z.boolean().optional(),
  inApp: z.boolean().optional(),
  sms: z.boolean().optional(),
  marketing: z.boolean().optional(),
  academic: z.boolean().optional(),
  finance: z.boolean().optional(),
  wellbeing: z.boolean().optional(),
  community: z.boolean().optional(),
});

export async function GET() {
  await recordApiRequest({ endpoint: "/api/notifications/preferences", method: "GET", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT", "ADMIN", "SUPER_ADMIN"]);
  return ok({ preferences: await getNotificationPreference(user.id) });
}

export async function PATCH(request: Request) {
  await recordApiRequest({ endpoint: "/api/notifications/preferences", method: "PATCH", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT", "ADMIN", "SUPER_ADMIN"]);
  const preferences = await updateNotificationPreference(user.id, schema.parse(await request.json()));
  return ok({ preferences });
}
