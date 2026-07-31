import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { ok } from "@/lib/api";
export async function GET() {
  await requireRole(["ADMIN","SUPER_ADMIN"]);
  await recordApiRequest({ endpoint: "/api/admin/deployment", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({
    blockedProviders: 2,
    rolloutBlockers: 3,
    pilotUniversities: 4,
    demoEnvironment: "Ready",
  });
}
