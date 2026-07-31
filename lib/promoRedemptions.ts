import { prisma } from "@/lib/prisma";

export async function validatePromoCode(code?: string | null) {
  if (!code) return null;
  const promo = await prisma.promoCode.findFirst({
    where: {
      code: code.toUpperCase(),
      active: true,
      startsAt: { lte: new Date() },
      expiresAt: { gte: new Date() },
    },
  });
  if (!promo) return null;
  if (promo.maxRedemptions && promo.redeemedCount >= promo.maxRedemptions) return null;
  return promo;
}

export async function reservePromoRedemption(input: {
  promoCode: string;
  userId: string;
  checkoutSessionId?: string;
  subscriptionId?: string;
  currencyCode?: string;
  metadata?: any;
}) {
  const promo = await validatePromoCode(input.promoCode);
  if (!promo) return { ok: false, error: "Promo code is invalid, expired or fully redeemed." };

  const redemption = await prisma.promoRedemption.create({
    data: {
      promoCodeId: promo.id,
      userId: input.userId,
      checkoutSessionId: input.checkoutSessionId,
      subscriptionId: input.subscriptionId,
      discountPercent: promo.discountPercent,
      discountAmountCents: promo.discountAmountCents,
      currencyCode: input.currencyCode,
      metadata: input.metadata || {},
    },
  });

  await prisma.promoCode.update({
    where: { id: promo.id },
    data: { redeemedCount: { increment: 1 } },
  });

  return { ok: true, promo, redemption };
}
