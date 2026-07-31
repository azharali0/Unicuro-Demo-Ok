import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { ok } from "@/lib/api";

export async function GET() {
  await requireRole(["ADMIN","SUPER_ADMIN"]);
  await recordApiRequest({ endpoint: "/api/admin/finance", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({
    failedPayments: 42,
    openFraudCases: 18,
    reconciliationMismatches: 3,
    openChargebacks: 5,
    message: "Admin finance hardening dashboard metrics implementation module.",
  });
}
