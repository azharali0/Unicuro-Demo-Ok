import { recordApiRequest } from "@/lib/apiDatabase";
import { ok, fail, parseJson } from "@/lib/api";
import { incidentRecordSchema } from "@/lib/infrastructureHardening";

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/infra/incidents", method: "POST", status: "REQUEST_RECEIVED" });
  const { data, error } = await parseJson(request, incidentRecordSchema);
  if (error || !data) return fail("Invalid reliability incident", 422, error);

  return ok({ message: "Reliability incident accepted.", incident: data });
}

export async function GET() {
  await recordApiRequest({ endpoint: "/api/infra/incidents", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({ incidents: [], message: "Reliability incidents implementation module." });
}
