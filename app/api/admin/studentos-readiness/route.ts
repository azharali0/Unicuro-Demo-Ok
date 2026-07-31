import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { getProviderReadiness } from "@/lib/providerReadiness";
import { ok } from "@/lib/http";

export async function GET() {
  await recordApiRequest({ endpoint: "/api/admin/studentos-readiness", method: "GET", status: "REQUEST_RECEIVED" });
  await requireRole(["ADMIN", "SUPER_ADMIN"]);
  return ok({ providers: getProviderReadiness() });
}
