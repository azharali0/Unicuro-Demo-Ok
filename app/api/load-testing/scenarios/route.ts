import { recordApiRequest } from "@/lib/apiDatabase";
import { ok } from "@/lib/api";

export async function GET() {
  await recordApiRequest({ endpoint: "/api/load-testing/scenarios", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({
    scenarios: [],
    message: "Load testing scenario implementation module for 10k, 50k, 100k, 500k and 1M users.",
  });
}
