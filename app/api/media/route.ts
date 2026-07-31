import { z } from "zod";
import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { createMediaAsset, listMediaAssets } from "@/lib/mediaStorageEngine";
import { ok } from "@/lib/http";
const schema = z.object({ fileName: z.string().min(1), mimeType: z.string().min(1), sizeBytes: z.number().int().positive(), purpose: z.string().min(1), publicUrl: z.string().url().optional() });
export async function GET() {
  await recordApiRequest({ endpoint: "/api/media", method: "GET", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT","MERCHANT","ADMIN","SUPER_ADMIN"]);
  return ok({ assets: await listMediaAssets(user.id) });
}
export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/media", method: "POST", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT","MERCHANT","ADMIN","SUPER_ADMIN"]);
  return ok({ asset: await createMediaAsset(user.id, schema.parse(await request.json())) }, { status: 201 });
}
