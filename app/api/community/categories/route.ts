import { recordApiRequest } from "@/lib/apiDatabase";
import { z } from "zod";
import { requireRole } from "@/lib/session";
import { createCommunityCategory, listCommunityCategories } from "@/lib/communityEngine";
import { ok } from "@/lib/http";

const schema = z.object({ name: z.string().min(2), slug: z.string().min(2), description: z.string().optional() });

export async function GET() {
  await recordApiRequest({ endpoint: "/api/community/categories", method: "GET", status: "REQUEST_RECEIVED" });
  await requireRole(["STUDENT", "MERCHANT", "ADMIN", "SUPER_ADMIN"]);
  return ok({ categories: await listCommunityCategories() });
}

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/community/categories", method: "POST", status: "REQUEST_RECEIVED" });
  await requireRole(["ADMIN", "SUPER_ADMIN"]);
  const category = await createCommunityCategory(schema.parse(await request.json()));
  return ok({ category }, { status: 201 });
}
