import { z } from "zod";
import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { completeOnboardingStep } from "@/lib/onboardingRuntimeEngine";
import { ok } from "@/lib/http";
import { NextResponse } from "next/server";

const schema = z.object({
  stepCode: z.string().min(1),
  payload: z.record(z.string(), z.unknown()),
});

export async function POST(request: Request) {
  await recordApiRequest({
    endpoint: "/api/onboarding/step",
    method: "POST",
    status: "REQUEST_RECEIVED",
  });

  try {
    const user = await requireRole(["STUDENT", "MERCHANT"]);
    const body = schema.parse(await request.json());
    return ok(await completeOnboardingStep(user.id, body.stepCode, body.payload as any), {
      status: 201,
    });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message || "An error occurred" }, { status: 400 });
  }
}
