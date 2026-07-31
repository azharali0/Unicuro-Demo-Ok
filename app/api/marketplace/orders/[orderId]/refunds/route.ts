import { recordApiRequest } from "@/lib/apiDatabase";
import { z } from "zod";
import { requireRole } from "@/lib/session";
import { requestMarketplaceRefund } from "@/lib/marketplaceEngine";
import { ok } from "@/lib/http";

const schema = z.object({ amountCents: z.number().int().positive(), currencyCode: z.string().min(3).max(3), reason: z.string().min(2) });

export async function POST(request: Request, props: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await props.params;
  await recordApiRequest({ endpoint: "/api/marketplace/orders/:orderId/refunds", method: "POST", status: "REQUEST_RECEIVED" });
  await requireRole(["STUDENT", "MERCHANT", "ADMIN", "SUPER_ADMIN"]);
  const body = schema.parse(await request.json());
  const refund = await requestMarketplaceRefund({ orderId: orderId, ...body });
  return ok({ refund }, { status: 201 });
}
