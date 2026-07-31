import { recordApiRequest } from "@/lib/apiDatabase";
import { ok, fail, parseJson } from "@/lib/api";
import { pilotFeedbackSchema } from "@/lib/universityPilot";

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/pilot-launch/feedback", method: "POST", status: "REQUEST_RECEIVED" });
  const { data, error } = await parseJson(request, pilotFeedbackSchema);
  if (error || !data) return fail("Invalid pilot feedback", 422, error);
  return ok({ message: "Pilot feedback accepted.", feedback: data });
}

export async function GET() {
  await recordApiRequest({ endpoint: "/api/pilot-launch/feedback", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({ feedback: [], message: "Pilot feedback implementation module." });
}
