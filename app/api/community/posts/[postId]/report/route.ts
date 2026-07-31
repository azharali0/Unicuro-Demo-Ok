import { recordApiRequest } from "@/lib/apiDatabase";
import { z } from "zod";
import { requireRole } from "@/lib/session";
import { reportCommunityPost } from "@/lib/communityEngine";
import { ok } from "@/lib/http";

const schema = z.object({ reason: z.string().min(2) });

export async function POST(request: Request, props: { params: Promise<{ postId: string }> }) {
  const { postId } = await props.params;
  await recordApiRequest({ endpoint: "/api/community/posts/:postId/report", method: "POST", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT", "ADMIN", "SUPER_ADMIN"]);
  const { reason } = schema.parse(await request.json());
  const report = await reportCommunityPost(user.id, postId, reason);
  return ok({ report }, { status: 201 });
}
