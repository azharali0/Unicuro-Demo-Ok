import { recordApiRequest } from "@/lib/apiDatabase";
import { ok, fail, parseJson } from "@/lib/api";
import { performanceMetricSchema } from "@/lib/qaProductionCandidate";

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/performance/metrics", method: "POST", status: "REQUEST_RECEIVED" });
  const { data, error } = await parseJson(request, performanceMetricSchema);
  if (error || !data) return fail("Invalid performance metric", 422, error);

  return ok({ message: "Performance metric accepted.", metric: data });
}

export async function GET() {
  await recordApiRequest({ endpoint: "/api/performance/metrics", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({ metrics: [], message: "Performance metrics implementation module." });
}
