import { recordApiRequest } from "@/lib/apiDatabase";
import { ok } from "@/lib/api";
import { calculateThreatScore, threatLevel } from "@/lib/securityHardening";

export async function GET() {
  await recordApiRequest({ endpoint: "/api/security/threat-score", method: "GET", status: "REQUEST_RECEIVED" });
  const score = calculateThreatScore({
    failedLogins: 3,
    ipRisk: "Medium",
    deviceKnown: false,
    apiBurst: true,
  });

  return ok({
    score,
    level: threatLevel(score),
    recommendation: score >= 65 ? "Step-up verification and security review required." : "Monitor.",
  });
}
