import { recordApiRequest } from "@/lib/apiDatabase";
import { requireRole } from "@/lib/session";
import { engineRegistry } from "@/lib/engineRegistry";
import { ok } from "@/lib/http";

export async function GET() {
  await recordApiRequest({ endpoint: "/api/admin/engines", method: "GET", status: "REQUEST_RECEIVED" });
  await requireRole(["ADMIN", "SUPER_ADMIN"]);
  return ok({ engines: engineRegistry });
}
