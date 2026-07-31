import { recordApiRequest } from "@/lib/apiDatabase";
import { z } from "zod";
import { requireRole } from "@/lib/session";
import { createMarketplaceOrder, listMarketplaceOrders } from "@/lib/marketplaceEngine";
import { ok } from "@/lib/http";

const schema = z.object({ listingId: z.string(), sellerId: z.string(), amountCents: z.number().int().positive(), currencyCode: z.string().min(3).max(3), escrowPaymentId: z.string().optional() });

export async function GET() {
  await recordApiRequest({ endpoint: "/api/marketplace/orders", method: "GET", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  return ok({ orders: await listMarketplaceOrders(user.id) });
}

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/marketplace/orders", method: "POST", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  const body = schema.parse(await request.json());
  const order = await createMarketplaceOrder({ buyerId: user.id, ...body });
  return ok({ order }, { status: 201 });
}
