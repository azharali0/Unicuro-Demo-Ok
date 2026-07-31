import { recordApiRequest } from "@/lib/apiDatabase";
import { ok, fail, parseJson } from "@/lib/api";
import { consentRecordSchema } from "@/lib/complianceGovernance";

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/compliance/consent", method: "POST", status: "REQUEST_RECEIVED" });
  const { data, error } = await parseJson(request, consentRecordSchema);
  if (error || !data) return fail("Invalid consent payload", 422, error);

  return ok({
    message: "Consent record accepted. Persist to ConsentRecord table in production.",
    consent: data,
  });
}

export async function GET() {
  await recordApiRequest({ endpoint: "/api/compliance/consent", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({
    records: [],
    message: "Consent records endpoint implementation module. Connect to ConsentRecord table.",
  });
}
