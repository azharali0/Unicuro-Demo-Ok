import { prisma } from "@/lib/prisma";
import { stripe } from "./billing";

export async function createMarketplaceEscrowPayment(input: {
  buyerId: string;
  buyerEmail: string;
  sellerId: string;
  listingId: string;
  amountPence: number;
  sellerStripeAccountId?: string;
}) {
  const escrow = await prisma.marketplaceEscrowPayment.create({
    data: {
      listingId: input.listingId,
      buyerId: input.buyerId,
      sellerId: input.sellerId,
      amountPence: input.amountPence,
      currency: "gbp",
      status: "PENDING",
    },
  });

  if (!stripe) {
    await prisma.marketplaceEscrowEvent.create({ data: { escrowPaymentId: escrow.id, eventType: "CHECKOUT_FAILED", status: "STRIPE_NOT_CONFIGURED" } });
    return { ok: false, error: "Stripe is not configured", escrowPaymentId: escrow.id };
  }

  if (!input.sellerStripeAccountId) {
    await prisma.marketplaceEscrowEvent.create({ data: { escrowPaymentId: escrow.id, eventType: "CHECKOUT_FAILED", status: "SELLER_CONNECT_REQUIRED" } });
    return { ok: false, error: "Seller Stripe Connect account is required", escrowPaymentId: escrow.id };
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: input.buyerEmail,
    line_items: [{
      price_data: {
        currency: "gbp",
        product_data: { name: `UniCuro Marketplace Listing ${input.listingId}` },
        unit_amount: input.amountPence,
      },
      quantity: 1,
    }],
    payment_intent_data: {
      application_fee_amount: Math.round(input.amountPence * 0.08),
      transfer_data: { destination: input.sellerStripeAccountId },
    },
    metadata: { escrowPaymentId: escrow.id, listingId: input.listingId, buyerId: input.buyerId, sellerId: input.sellerId },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/student/marketplace?payment=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/student/marketplace?payment=cancelled`,
  });

  await prisma.marketplaceEscrowPayment.update({ where: { id: escrow.id }, data: { stripeSessionId: session.id } });
  await prisma.marketplaceEscrowEvent.create({ data: { escrowPaymentId: escrow.id, eventType: "CHECKOUT_CREATED", status: "PENDING", amountCents: input.amountPence, currencyCode: "GBP" } });

  return { ok: true, checkoutUrl: session.url, escrowPaymentId: escrow.id };
}
