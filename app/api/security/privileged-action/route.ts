import { recordApiRequest } from "@/lib/apiDatabase";
import { ok, fail, parseJson } from "@/lib/api";
import { privilegedActionSchema } from "@/lib/securityHardening";

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/security/privileged-action", method: "POST", status: "REQUEST_RECEIVED" });
  const { data, error } = await parseJson(request, privilegedActionSchema);
  if (error || !data) return fail("Invalid privileged action payload", 422, error);

  return ok({
    status: "PENDING_APPROVAL",
    message: "Privileged action requires approval. Persist to PrivilegedActionApproval table.",
    action: data,
  });
}
