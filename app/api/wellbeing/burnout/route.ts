import { recordApiRequest } from "@/lib/apiDatabase";
import { ok } from "@/lib/api";

export async function GET() {
  await recordApiRequest({ endpoint: "/api/wellbeing/burnout", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({
    signals: [],
    message: "Burnout signal endpoint implementation module. Connect to academic workload, sleep, mood and finance signals.",
  });
}
