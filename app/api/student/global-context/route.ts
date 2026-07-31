import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { getLocalizedStudentContext } from "@/lib/globalStudentIntelligenceEngine";
import { ok } from "@/lib/http";
import { getUserCountryCode } from "@/lib/userContextEngine";

export async function GET(request: Request) {
  await recordApiRequest({ endpoint: "/api/student/global-context", method: "GET", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  const requested = new URL(request.url).searchParams.get("countryCode");
  const countryCode = requested || await getUserCountryCode(user.id);
  if (!countryCode) return Response.json({ ok: false, error: "COUNTRY_CONFIGURATION_REQUIRED" }, { status: 422 });
  return ok(await getLocalizedStudentContext(countryCode));
}
