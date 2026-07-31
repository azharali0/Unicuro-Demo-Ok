import { prisma } from "@/lib/prisma";
export async function recordHealth(service: string, status: string, latencyMs?: number, detail?: string) {
  return prisma.systemHealthCheck.create({ data: { service, status, latencyMs, detail } });
}
export async function getLatestHealth() {
  return prisma.systemHealthCheck.findMany({ orderBy: { checkedAt: "desc" }, take: 100 });
}
