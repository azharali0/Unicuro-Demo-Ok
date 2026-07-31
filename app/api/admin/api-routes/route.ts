import { requireRole } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { ok } from "@/lib/http";

export async function GET() {
  const { recordApiRequest } = await import("@/lib/apiDatabase");
  await recordApiRequest({ endpoint: "/api/admin/api-routes", method: "GET", status: "REQUEST_RECEIVED" });
  await requireRole(["ADMIN", "SUPER_ADMIN"]);
  const routes = await prisma.apiRouteRegistry.findMany({ where: { active: true }, orderBy: { endpoint: "asc" } });
  return ok({ routes });
}
