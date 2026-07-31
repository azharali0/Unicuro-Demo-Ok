import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { listJobs } from "@/lib/backgroundJobEngine";
import { ok } from "@/lib/http";
export async function GET(request: Request) {
  await recordApiRequest({ endpoint: "/api/admin/jobs", method: "GET", status: "REQUEST_RECEIVED" });
  await requireRole(["ADMIN","SUPER_ADMIN"]);
  return ok({ jobs: await listJobs(new URL(request.url).searchParams.get("status") || undefined) });
}
