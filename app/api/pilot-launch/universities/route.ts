import { recordApiRequest } from "@/lib/apiDatabase";
import { ok, fail, parseJson } from "@/lib/api";
import { pilotUniversitySchema } from "@/lib/universityPilot";

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/pilot-launch/universities", method: "POST", status: "REQUEST_RECEIVED" });
  const { data, error } = await parseJson(request, pilotUniversitySchema);
  if (error || !data) return fail("Invalid pilot university payload", 422, error);
  return ok({ message: "Pilot university accepted.", university: data });
}

export async function GET() {
  await recordApiRequest({ endpoint: "/api/pilot-launch/universities", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({ universities: [], message: "Pilot university launch implementation module." });
}
