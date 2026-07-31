import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { ok } from "@/lib/api";

export async function GET() {
  await requireRole(["ADMIN","SUPER_ADMIN"]);
  await recordApiRequest({ endpoint: "/api/admin/identity-cases", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({
    cases: [],
    message: "Admin identity verification cases endpoint implementation module. Connect to VerificationRequest and FraudSignal tables.",
  });
}
