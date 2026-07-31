import { recordApiRequest } from "@/lib/apiDatabase";
import { requireRole } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { ok } from "@/lib/http";
export async function GET() {
  await recordApiRequest({ endpoint: "/api/admin/overview", method: "GET", status: "REQUEST_RECEIVED" });
  await requireRole(["ADMIN"]);
  const [tasks, deals, opportunities, scholarships] = await Promise.all([
    prisma.studentTask.count(), prisma.studentDeal.count(), prisma.studentOpportunity.count(), prisma.studentScholarship.count()
  ]);
  return ok({ overview: { tasks, deals, opportunities, scholarships } });
}
