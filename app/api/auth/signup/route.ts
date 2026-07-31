import { recordApiRequest } from "@/lib/apiDatabase";
import { ok, fail, parseJson } from "@/lib/api";
import { scoreSignupRisk, signupSchema } from "@/lib/identity";

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/auth/signup", method: "POST", status: "REQUEST_RECEIVED" });
  const { data, error } = await parseJson(request, signupSchema);
  if (error || !data) return fail("Invalid signup payload", 422, error);

  const riskScore = scoreSignupRisk({
    email: data.email,
    countryCode: data.countryCode,
    deviceRisk: "Low",
  });

  return ok({
    message: "Signup validated. Connect this to Prisma User/AuthIdentity before production.",
    riskScore,
    stepUpRequired: riskScore >= 70,
  });
}
