import { recordApiRequest } from "@/lib/apiDatabase";
import { ok } from "@/lib/api";

export async function GET() {
  await recordApiRequest({ endpoint: "/api/compliance/policies", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({
    policies: [],
    message: "Policy document endpoint implementation module. Connect to PolicyDocument table.",
  });
}
