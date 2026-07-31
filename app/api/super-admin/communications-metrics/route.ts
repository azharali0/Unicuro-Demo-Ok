import { recordApiRequest } from "@/lib/apiDatabase";
import { ok } from "@/lib/api";

export async function GET() {
  await recordApiRequest({ endpoint: "/api/super-admin/communications-metrics", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({
    messagesSent: "4.8m",
    notificationCtr: "18.6%",
    supportCsat: "4.6/5",
    aiDeflection: "38%",
  });
}
