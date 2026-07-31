import { prisma } from "@/lib/prisma";
export async function listFeatureFlags() {
  return prisma.featureFlag.findMany({ orderBy: { key: "asc" } });
}
export async function setFeatureFlag(key: string, enabled: boolean, rules?: any) {
  return prisma.featureFlag.upsert({
    where: { key },
    update: { enabled, rules },
    create: { key, name: key, description: key, enabled, rules },
  });
}
export async function isFeatureEnabled(key: string) {
  const flag = await prisma.featureFlag.findUnique({ where: { key } });
  return Boolean(flag?.enabled);
}
