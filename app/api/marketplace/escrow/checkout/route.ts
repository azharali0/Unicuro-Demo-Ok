import { recordApiRequest } from "@/lib/apiDatabase";
import { NextResponse } from "next/server";
import { z } from "zod";
import { requireRole } from "@/lib/session";
import { createMarketplaceEscrowPayment } from "@/lib/escrow";

const schema = z.object({
  listingId: z.string(),
  sellerId: z.string(),
  amountPence: z.number().int().positive(),
  sellerStripeAccountId: z.string().optional(),
});

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/marketplace/escrow/checkout", method: "POST", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  const data = schema.parse(await request.json());
  const result = await createMarketplaceEscrowPayment({
    buyerId: user.id,
    buyerEmail: user.email,
    listingId: data.listingId,
    sellerId: data.sellerId,
    amountPence: data.amountPence,
    sellerStripeAccountId: data.sellerStripeAccountId,
  });
  return NextResponse.json(result, { status: result.ok ? 200 : 428 });
}
