import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { listOpportunities } from "@/lib/studentEnginesDb";
import { ok } from "@/lib/http";
export async function GET(request: Request) {
  await recordApiRequest({ endpoint: "/api/student/earn", method: "GET", status: "REQUEST_RECEIVED" });
  await requireRole(["STUDENT", "MERCHANT"]);
  return ok({ opportunities: await listOpportunities(new URL(request.url).searchParams.get("countryCode") || undefined) });
}
