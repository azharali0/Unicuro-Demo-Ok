import { recordApiRequest } from "@/lib/apiDatabase";
import { ok } from "@/lib/api";

export async function GET() {
  await recordApiRequest({ endpoint: "/api/infra/queues", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({
    queues: [],
    message: "Queue metrics implementation module. Connect to QueueMetric table and worker queues.",
  });
}
