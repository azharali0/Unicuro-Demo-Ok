import { prisma } from "@/lib/prisma";
export async function searchGlobal(input: { query: string; userId?: string; countryCode?: string; limit?: number }) {
  const q = input.query.trim();
  if (!q) {
    return prisma.globalSearchDocument.findMany({
      where: {
        active: true,
        ...(input.countryCode ? { OR: [{ countryCode: input.countryCode }, { countryCode: null }] } : {}),
      },
      orderBy: { updatedAt: "desc" },
      take: input.limit || 30,
    });
  }
  return prisma.globalSearchDocument.findMany({
    where: {
      active: true,
      ...(input.countryCode ? { OR: [{ countryCode: input.countryCode }, { countryCode: null }] } : {}),
      AND: [{
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { summary: { contains: q, mode: "insensitive" } },
          { searchText: { contains: q, mode: "insensitive" } },
        ],
      }],
    },
    orderBy: { updatedAt: "desc" },
    take: input.limit || 30,
  });
}
export async function indexSearchDocument(data: any) {
  return prisma.globalSearchDocument.upsert({
    where: { id: data.id || `${data.entityType}:${data.entityId}` },
    update: data,
    create: { id: data.id || `${data.entityType}:${data.entityId}`, ...data },
  });
}
