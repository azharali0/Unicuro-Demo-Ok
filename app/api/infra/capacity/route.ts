import { recordApiRequest } from "@/lib/apiDatabase";
import { ok } from "@/lib/api";
import { capacityStatus } from "@/lib/infrastructureHardening";

export async function GET() {
  await recordApiRequest({ endpoint: "/api/infra/capacity", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({
    database: capacityStatus(68),
    api: capacityStatus(72),
    queues: capacityStatus(54),
    storage: capacityStatus(61),
  });
}
