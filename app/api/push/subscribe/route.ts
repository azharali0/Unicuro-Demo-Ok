import { recordApiRequest } from "@/lib/apiDatabase";
import { NextResponse } from "next/server";
import { z } from "zod";
import { requireRole } from "@/lib/session";
import { savePushSubscription } from "@/lib/pushNotifications";

const schema = z.object({
  endpoint: z.string().url(),
  keys: z.object({ p256dh: z.string(), auth: z.string() }),
});

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/push/subscribe", method: "POST", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT", "ADMIN", "SUPER_ADMIN"]);
  const data = schema.parse(await request.json());
  const subscription = await savePushSubscription({
    userId: user.id,
    endpoint: data.endpoint,
    p256dh: data.keys.p256dh,
    auth: data.keys.auth,
    userAgent: request.headers.get("user-agent") || undefined,
  });
  return NextResponse.json({ ok: true, subscriptionId: subscription.id });
}
