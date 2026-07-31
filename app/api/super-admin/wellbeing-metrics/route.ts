import { recordApiRequest } from "@/lib/apiDatabase";
import { ok } from "@/lib/api";

export async function GET() {
  await recordApiRequest({ endpoint: "/api/super-admin/wellbeing-metrics", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({
    burnoutDetectionPrecision: "84%",
    urgentSupportRouting: "99.2%",
    wellbeingEngagementLift: "+22%",
  });
}
