import { recordApiRequest } from "@/lib/apiDatabase";
import { requireRole } from "@/lib/session";
import { likeCommunityPost } from "@/lib/communityEngine";
import { ok } from "@/lib/http";

export async function POST(_: Request, props: { params: Promise<{ postId: string }> }) {
  const { postId } = await props.params;
  await recordApiRequest({ endpoint: "/api/community/posts/:postId/like", method: "POST", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  const like = await likeCommunityPost(user.id, postId);
  return ok({ like });
}
