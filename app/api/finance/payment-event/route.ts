import { recordApiRequest } from "@/lib/apiDatabase";
import { ok, fail, parseJson } from "@/lib/api";
import { idempotencyKey, paymentEventSchema } from "@/lib/financialHardening";

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/finance/payment-event", method: "POST", status: "REQUEST_RECEIVED" });
  const { data, error } = await parseJson(request, paymentEventSchema);
  if (error || !data) return fail("Invalid payment event", 422, error);

  return ok({
    message: "Payment event validated. Persist with idempotency protection.",
    idempotencyKey: idempotencyKey(data.provider, data.eventId),
    event: data,
  });
}
