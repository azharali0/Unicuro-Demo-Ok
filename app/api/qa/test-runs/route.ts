import { recordApiRequest } from "@/lib/apiDatabase";
import { ok, fail, parseJson } from "@/lib/api";
import { testRunSchema, testPassRate } from "@/lib/qaProductionCandidate";

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/qa/test-runs", method: "POST", status: "REQUEST_RECEIVED" });
  const { data, error } = await parseJson(request, testRunSchema);
  if (error || !data) return fail("Invalid test run payload", 422, error);

  return ok({
    message: "QA test run accepted. Persist to QaTestRun table.",
    passRate: testPassRate(data.passed, data.failed),
    run: data,
  });
}

export async function GET() {
  await recordApiRequest({ endpoint: "/api/qa/test-runs", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({ runs: [], message: "QA test runs implementation module." });
}
