import { prisma } from "@/lib/prisma";

export async function createMarketplaceOrder(input: { listingId: string; buyerId: string; sellerId: string; amountCents: number; currencyCode: string; escrowPaymentId?: string }) {
  return prisma.marketplaceOrder.create({ data: input });
}

export async function listMarketplaceOrders(userId: string) {
  return prisma.marketplaceOrder.findMany({
    where: { OR: [{ buyerId: userId }, { sellerId: userId }] },
    orderBy: { createdAt: "desc" },
  });
}

export async function requestMarketplaceRefund(input: { orderId: string; amountCents: number; currencyCode: string; reason: string }) {
  return prisma.marketplaceRefund.create({ data: input });
}

export async function createSellerPayout(input: { sellerId: string; amountCents: number; currencyCode: string; providerId?: string }) {
  return prisma.sellerPayout.create({ data: input });
}
