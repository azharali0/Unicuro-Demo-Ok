import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { prisma } from "@/lib/prisma";
import { ok } from "@/lib/http";

export async function GET(request: Request) {
  await recordApiRequest({ endpoint: "/api/admin/operations/events", method: "GET", status: "REQUEST_RECEIVED" });
  await requireRole(["ADMIN", "SUPER_ADMIN"]);
  const status = new URL(request.url).searchParams.get("status") || undefined;
  return ok({
    events: await prisma.domainEvent.findMany({
      where: status ? { status } : {},
      orderBy: { occurredAt: "desc" },
      take: 200,
    }),
  });
}
