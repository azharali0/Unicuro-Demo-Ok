import { prisma } from "@/lib/prisma";

export async function getMarketplaceDashboard(userId: string) {
  const [listings, orders, recommendations] = await Promise.all([
    prisma.studentMarketplaceListing.findMany({ where: { status: "LIVE" }, orderBy: { createdAt: "desc" } }),
    prisma.marketplaceOrder.findMany({ where: { OR: [{ buyerId: userId }, { sellerId: userId }] }, orderBy: { createdAt: "desc" } }),
    prisma.marketplaceRecommendation.findMany({ where: { userId }, orderBy: { score: "desc" } }),
  ]);
  return { listings, orders, recommendations };
}

export async function refreshMarketplaceRecommendations(userId: string) {
  const saved = await prisma.savedItem.findMany({ where: { userId } });
  const listings = await prisma.studentMarketplaceListing.findMany({ where: { status: "LIVE" } });
  const savedTitles = saved.map((item) => item.title.toLowerCase());
  const results = [];
  for (const listing of listings) {
    let score = 50;
    const reasons = [];
    if (savedTitles.some((title) => listing.title.toLowerCase().includes(title))) {
      score += 40;
      reasons.push("Related to saved items");
    }
    results.push(await prisma.marketplaceRecommendation.upsert({
      where: { userId_listingId: { userId, listingId: listing.id } },
      update: { score, reasons },
      create: { userId, listingId: listing.id, score, reasons },
    }));
  }
  return results;
}
