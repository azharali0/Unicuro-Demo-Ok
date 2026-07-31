import { recordApiRequest } from "@/lib/apiDatabase";
import { ok, fail, parseJson } from "@/lib/api";
import { calculateReadinessScore, launchItemSchema, readinessStatus } from "@/lib/launchReadiness";

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/launch/readiness", method: "POST", status: "REQUEST_RECEIVED" });
  const { data, error } = await parseJson(request, launchItemSchema);
  if (error || !data) return fail("Invalid launch readiness item", 422, error);

  const score = calculateReadinessScore([data]);

  return ok({
    message: "Launch readiness item validated. Connect to LaunchReadinessItem table.",
    score,
    status: readinessStatus(score),
    item: data,
  });
}

export async function GET() {
  await recordApiRequest({ endpoint: "/api/launch/readiness", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({
    overallReadiness: 76,
    status: "Watch",
    message: "Launch readiness metrics implementation module.",
  });
}
