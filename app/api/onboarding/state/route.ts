import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { getOnboardingState } from "@/lib/onboardingRuntimeEngine";
import { ok } from "@/lib/http";

export async function GET() {
  await recordApiRequest({
    endpoint: "/api/onboarding/state",
    method: "GET",
    status: "REQUEST_RECEIVED",
  });

  const user = await requireRole(["STUDENT", "MERCHANT"]);
  return ok(await getOnboardingState(user.id));
}
