import { recordApiRequest } from "@/lib/apiDatabase";
import { ok, fail, parseJson } from "@/lib/api";
import { dsarDueDate, dsarRequestSchema } from "@/lib/complianceGovernance";

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/compliance/dsar", method: "POST", status: "REQUEST_RECEIVED" });
  const { data, error } = await parseJson(request, dsarRequestSchema);
  if (error || !data) return fail("Invalid DSAR payload", 422, error);

  return ok({
    message: "Data subject request accepted. Persist to DataSubjectRequest table.",
    dueDate: dsarDueDate(30),
    request: data,
  });
}

export async function GET() {
  await recordApiRequest({ endpoint: "/api/compliance/dsar", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({
    requests: [],
    message: "DSAR endpoint implementation module. Connect to DataSubjectRequest table.",
  });
}
