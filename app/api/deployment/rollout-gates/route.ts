import { recordApiRequest } from "@/lib/apiDatabase";
import { ok, fail, parseJson } from "@/lib/api";
import { rolloutGateSchema } from "@/lib/deploymentReadiness";

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/deployment/rollout-gates", method: "POST", status: "REQUEST_RECEIVED" });
  const { data, error } = await parseJson(request, rolloutGateSchema);
  if (error || !data) return fail("Invalid rollout gate", 422, error);
  return ok({ message: "Rollout gate accepted.", gate: data });
}

export async function GET() {
  await recordApiRequest({ endpoint: "/api/deployment/rollout-gates", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({ gates: [], message: "Rollout gate implementation module." });
}
