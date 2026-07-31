import { prisma } from "@/lib/prisma";
import crypto from "crypto";
export async function createMediaAsset(ownerId: string, data: { fileName: string; mimeType: string; sizeBytes: number; purpose: string; publicUrl?: string; metadata?: any }) {
  const storageKey = `${ownerId}/${crypto.randomUUID()}-${data.fileName}`;
  return prisma.mediaAsset.create({ data: { ownerId, storageKey, status: "PENDING_UPLOAD", ...data } });
}
export async function completeMediaAsset(ownerId: string, id: string, publicUrl: string) {
  const asset = await prisma.mediaAsset.findFirst({ where: { id, ownerId } });
  if (!asset) throw new Error("MEDIA_ASSET_NOT_FOUND");
  return prisma.mediaAsset.update({ where: { id }, data: { publicUrl, status: "ACTIVE" } });
}
export async function listMediaAssets(ownerId: string) {
  return prisma.mediaAsset.findMany({ where: { ownerId, status: "ACTIVE" }, orderBy: { createdAt: "desc" } });
}
