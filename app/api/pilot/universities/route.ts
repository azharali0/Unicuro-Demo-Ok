import { recordApiRequest } from "@/lib/apiDatabase";
import { ok, fail, parseJson } from "@/lib/api";
import { pilotUniversitySchema, pilotHealth } from "@/lib/deploymentReadiness";

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/pilot/universities", method: "POST", status: "REQUEST_RECEIVED" });
  const { data, error } = await parseJson(request, pilotUniversitySchema);
  if (error || !data) return fail("Invalid pilot university", 422, error);
  return ok({
    message: "Pilot university accepted.",
    health: pilotHealth(0, data.cohortSize, 0),
    pilot: data,
  });
}

export async function GET() {
  await recordApiRequest({ endpoint: "/api/pilot/universities", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({ pilots: [], message: "University pilot implementation module." });
}
