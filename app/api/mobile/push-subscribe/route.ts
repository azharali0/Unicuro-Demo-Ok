import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { ok, fail, parseJson } from "@/lib/api";
import { pushSubscriptionSchema } from "@/lib/mobile";

export async function POST(request: Request) {
  await requireRole(["STUDENT","MERCHANT","ADMIN","SUPER_ADMIN"]);
  await recordApiRequest({ endpoint: "/api/mobile/push-subscribe", method: "POST", status: "REQUEST_RECEIVED" });
  const { data, error } = await parseJson(request, pushSubscriptionSchema);
  if (error || !data) return fail("Invalid push subscription payload", 422, error);

  return ok({
    message: "Push subscription validated. Connect to PushSubscription table and web-push provider.",
    subscription: data,
  });
}
