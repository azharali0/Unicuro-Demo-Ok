import { recordApiRequest } from "@/lib/apiDatabase";
import { ok } from "@/lib/api";

export async function GET() {
  await recordApiRequest({ endpoint: "/api/super-admin/identity-metrics", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({
    verifiedStudents: "82.4%",
    blockedFraudAttempts: 4820,
    averageIdentityScore: 768,
    highRiskSignupRate: "1.8%",
  });
}
