import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { ok, fail, parseJson } from "@/lib/api";
import { supportMessageSchema } from "@/lib/communications";

export async function POST(request: Request) {
  await requireRole(["STUDENT","MERCHANT","ADMIN","SUPER_ADMIN"]);
  await recordApiRequest({ endpoint: "/api/support/chat", method: "POST", status: "REQUEST_RECEIVED" });
  const { data, error } = await parseJson(request, supportMessageSchema);
  if (error || !data) return fail("Invalid support message payload", 422, error);

  return ok({
    message: "Support message accepted. Connect to SupportConversation and ticket routing in production.",
    support: data,
  });
}
