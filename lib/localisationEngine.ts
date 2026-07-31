import { prisma } from "@/lib/prisma";
export async function getLocalisation(userId: string) {
  return prisma.localisationPreference.upsert({ where: { userId }, update: {}, create: { userId } });
}
export async function updateLocalisation(userId: string, data: { languageCode?: string; countryCode?: string; currencyCode?: string; timezone?: string }) {
  return prisma.localisationPreference.upsert({ where: { userId }, update: data, create: { userId, ...data } });
}
