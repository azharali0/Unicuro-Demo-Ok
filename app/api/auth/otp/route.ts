import { recordApiRequest } from "@/lib/apiDatabase";
import { ok, fail, parseJson } from "@/lib/api";
import { otpSchema } from "@/lib/identity";

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/auth/otp", method: "POST", status: "REQUEST_RECEIVED" });
  const { data, error } = await parseJson(request, otpSchema);
  if (error || !data) return fail("Invalid OTP payload", 422, error);

  return ok({
    verified: data.code === "123456",
    message: "OTP implementation module. Replace review code with hashed OTP storage and expiry checks.",
  });
}
