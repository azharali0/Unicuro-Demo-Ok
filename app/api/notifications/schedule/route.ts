import { recordApiRequest } from "@/lib/apiDatabase";
import { z } from "zod";
import { requireRole } from "@/lib/session";
import { scheduleNotification } from "@/lib/notificationPreferenceEngine";
import { ok } from "@/lib/http";

const schema = z.object({
  userId: z.string().optional(),
  segment: z.string().optional(),
  title: z.string().min(2),
  body: z.string().min(2),
  channel: z.string(),
  scheduledAt: z.string().datetime(),
});

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/notifications/schedule", method: "POST", status: "REQUEST_RECEIVED" });
  await requireRole(["ADMIN", "SUPER_ADMIN"]);
  const body = schema.parse(await request.json());
  const scheduled = await scheduleNotification({ ...body, scheduledAt: new Date(body.scheduledAt) });
  return ok({ scheduled }, { status: 201 });
}
