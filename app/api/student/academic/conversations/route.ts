import { recordApiRequest } from "@/lib/apiDatabase";
import { requireRole } from "@/lib/session";
import { listConversations } from "@/lib/aiConversationEngine";
import { ok } from "@/lib/http";

export async function GET() {
  await recordApiRequest({ endpoint: "/api/student/academic/conversations", method: "GET", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  return ok({ conversations: await listConversations(user.id) });
}
