import { recordApiRequest } from "@/lib/apiDatabase";
import { requireRole } from "@/lib/session";
import { listScholarships } from "@/lib/studentEnginesDb";
import { ok } from "@/lib/http";
export async function GET(request: Request) {
  await recordApiRequest({ endpoint: "/api/student/scholarships", method: "GET", status: "REQUEST_RECEIVED" });
  await requireRole(["STUDENT", "MERCHANT"]);
  return ok({ scholarships: await listScholarships(new URL(request.url).searchParams.get("countryCode") || "US") });
}
