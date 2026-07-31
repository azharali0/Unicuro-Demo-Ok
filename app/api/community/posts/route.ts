import { recordApiRequest } from "@/lib/apiDatabase";
import { z } from "zod";
import { requireRole } from "@/lib/session";
import { createCommunityPost, listCommunityPosts } from "@/lib/communityEngine";
import { ok } from "@/lib/http";

const schema = z.object({ categoryId: z.string(), title: z.string().min(2), body: z.string().min(2) });

export async function GET(request: Request) {
  await recordApiRequest({ endpoint: "/api/community/posts", method: "GET", status: "REQUEST_RECEIVED" });
  await requireRole(["STUDENT", "MERCHANT", "ADMIN", "SUPER_ADMIN"]);
  const categorySlug = new URL(request.url).searchParams.get("category") || undefined;
  return ok({ posts: await listCommunityPosts(categorySlug) });
}

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/community/posts", method: "POST", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  const post = await createCommunityPost(user.id, schema.parse(await request.json()));
  return ok({ post }, { status: 201 });
}
