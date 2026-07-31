import { recordApiRequest } from "@/lib/apiDatabase";
import { ok, fail, parseJson } from "@/lib/api";
import { releaseCandidateSchema } from "@/lib/qaProductionCandidate";

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/release/candidates", method: "POST", status: "REQUEST_RECEIVED" });
  const { data, error } = await parseJson(request, releaseCandidateSchema);
  if (error || !data) return fail("Invalid release candidate", 422, error);

  return ok({ message: "Release candidate accepted.", candidate: data });
}

export async function GET() {
  await recordApiRequest({ endpoint: "/api/release/candidates", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({ candidates: [], message: "Release candidate implementation module." });
}
