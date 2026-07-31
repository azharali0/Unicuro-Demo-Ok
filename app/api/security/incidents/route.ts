import { recordApiRequest } from "@/lib/apiDatabase";
import { ok } from "@/lib/api";

export async function GET() {
  await recordApiRequest({ endpoint: "/api/security/incidents", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({
    incidents: [],
    message: "Security incident endpoint implementation module. Connect to SecurityIncident table.",
  });
}
