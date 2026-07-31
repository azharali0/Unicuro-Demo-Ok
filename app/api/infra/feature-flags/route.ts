import { recordApiRequest } from "@/lib/apiDatabase";
import { ok, fail, parseJson } from "@/lib/api";
import { featureFlagSchema } from "@/lib/infrastructureHardening";

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/infra/feature-flags", method: "POST", status: "REQUEST_RECEIVED" });
  const { data, error } = await parseJson(request, featureFlagSchema);
  if (error || !data) return fail("Invalid feature flag", 422, error);

  return ok({ message: "Feature flag validated. Persist to FeatureFlag table.", flag: data });
}

export async function GET() {
  await recordApiRequest({ endpoint: "/api/infra/feature-flags", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({ flags: [], message: "Feature flags implementation module." });
}
