import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { getLatestHealth } from "@/lib/monitoringEngine";
import { ok } from "@/lib/http";
export async function GET() {
  await recordApiRequest({ endpoint: "/api/admin/monitoring", method: "GET", status: "REQUEST_RECEIVED" });
  await requireRole(["ADMIN","SUPER_ADMIN"]);
  return ok({ checks: await getLatestHealth() });
}
