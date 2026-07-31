import { recordApiRequest } from "@/lib/apiDatabase";
import { ok, fail, parseJson } from "@/lib/api";
import { uatFeedbackSchema } from "@/lib/qaProductionCandidate";

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/uat/feedback", method: "POST", status: "REQUEST_RECEIVED" });
  const { data, error } = await parseJson(request, uatFeedbackSchema);
  if (error || !data) return fail("Invalid UAT feedback", 422, error);

  return ok({ message: "UAT feedback accepted.", feedback: data });
}

export async function GET() {
  await recordApiRequest({ endpoint: "/api/uat/feedback", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({ feedback: [], message: "UAT feedback implementation module." });
}
