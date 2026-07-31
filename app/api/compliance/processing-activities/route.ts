import { recordApiRequest } from "@/lib/apiDatabase";
import { ok, fail, parseJson } from "@/lib/api";
import { processingActivitySchema, requiresDpia } from "@/lib/complianceGovernance";

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/compliance/processing-activities", method: "POST", status: "REQUEST_RECEIVED" });
  const { data, error } = await parseJson(request, processingActivitySchema);
  if (error || !data) return fail("Invalid processing activity payload", 422, error);

  return ok({
    message: "Processing activity validated. Persist to DataProcessingActivity table.",
    dpiaRequired: requiresDpia({ includesAI: data.activity.toLowerCase().includes("ai"), largeScale: true }),
    activity: data,
  });
}

export async function GET() {
  await recordApiRequest({ endpoint: "/api/compliance/processing-activities", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({
    activities: [],
    message: "Processing activity register implementation module.",
  });
}
