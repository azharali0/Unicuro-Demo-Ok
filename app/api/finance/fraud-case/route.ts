import { recordApiRequest } from "@/lib/apiDatabase";
import { ok, fail, parseJson } from "@/lib/api";
import { fraudCaseSchema, fraudSeverity } from "@/lib/financialHardening";

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/finance/fraud-case", method: "POST", status: "REQUEST_RECEIVED" });
  const { data, error } = await parseJson(request, fraudCaseSchema);
  if (error || !data) return fail("Invalid fraud case", 422, error);

  return ok({
    severity: fraudSeverity(data.riskScore),
    message: "Financial fraud case accepted.",
    case: data,
  });
}
