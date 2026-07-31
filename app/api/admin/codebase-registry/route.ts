import { requireRole } from "@/lib/session";
import { ok } from "@/lib/http";
import { recordApiRequest } from "@/lib/apiDatabase";
import { codebaseRegistry } from "@/lib/codebaseRegistry";

export async function GET() {
  await recordApiRequest({ endpoint: "/api/admin/codebase-registry", method: "GET", status: "REQUEST_RECEIVED" });
  await requireRole(["ADMIN", "SUPER_ADMIN"]);
  return ok({ registry: codebaseRegistry });
}
