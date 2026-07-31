import { prisma } from "@/lib/prisma";
export async function listSavedItems(userId: string) {
  return prisma.savedItem.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });
}
export async function saveItem(userId: string, data: { entityType: string; entityId: string; route: string; title: string }) {
  return prisma.savedItem.upsert({
    where: { userId_entityType_entityId: { userId, entityType: data.entityType, entityId: data.entityId } },
    update: { route: data.route, title: data.title },
    create: { userId, ...data },
  });
}
export async function removeSavedItem(userId: string, entityType: string, entityId: string) {
  return prisma.savedItem.delete({ where: { userId_entityType_entityId: { userId, entityType, entityId } } });
}
