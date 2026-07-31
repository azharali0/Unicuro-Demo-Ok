import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { listOnboardingOptions } from "@/lib/onboardingRuntimeEngine";
import { ok } from "@/lib/http";

export async function GET(request: Request) {
  await recordApiRequest({
    endpoint: "/api/onboarding/options",
    method: "GET",
    status: "REQUEST_RECEIVED",
  });

  await requireRole(["STUDENT", "MERCHANT", "ADMIN", "SUPER_ADMIN"]);
  const category = new URL(request.url).searchParams.get("category") || undefined;
  return ok({ options: await listOnboardingOptions(category) });
}
