import { recordApiRequest } from "@/lib/apiDatabase";
import { ok } from "@/lib/api";

export async function GET() {
  await recordApiRequest({ endpoint: "/api/super-admin/launch-metrics", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({
    production: 78,
    security: 72,
    compliance: 68,
    qa: 81,
    deployment: 74,
    investor: 86,
    overall: 76,
  });
}
