import { recordApiRequest } from "@/lib/apiDatabase";
import { ok, fail, parseJson } from "@/lib/api";
import { accessibilityIssueSchema } from "@/lib/qaProductionCandidate";

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/accessibility/issues", method: "POST", status: "REQUEST_RECEIVED" });
  const { data, error } = await parseJson(request, accessibilityIssueSchema);
  if (error || !data) return fail("Invalid accessibility issue", 422, error);

  return ok({ message: "Accessibility issue accepted.", issue: data });
}

export async function GET() {
  await recordApiRequest({ endpoint: "/api/accessibility/issues", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({ issues: [], message: "Accessibility issue implementation module." });
}
