import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { prisma } from "@/lib/prisma";
import { ok } from "@/lib/http";

export async function GET(request: Request) {
  await recordApiRequest({ endpoint: "/api/admin/operations/traces", method: "GET", status: "REQUEST_RECEIVED" });
  await requireRole(["ADMIN", "SUPER_ADMIN"]);
  const url = new URL(request.url);
  const correlationId = url.searchParams.get("correlationId") || undefined;
  return ok({
    traces: await prisma.operationTrace.findMany({
      where: correlationId ? { correlationId } : {},
      orderBy: { createdAt: "desc" },
      take: 200,
    }),
  });
}
