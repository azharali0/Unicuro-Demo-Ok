import { recordApiRequest } from "@/lib/apiDatabase";
import { ok, fail, parseJson } from "@/lib/api";
import { z } from "zod";
import { hashSecurityValue } from "@/lib/securityHardening";

const schema = z.object({
  userId: z.string().min(1),
  method: z.enum(["TOTP", "SMS", "EMAIL", "BACKUP_CODE"]),
});

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/security/mfa/enroll", method: "POST", status: "REQUEST_RECEIVED" });
  const { data, error } = await parseJson(request, schema);
  if (error || !data) return fail("Invalid MFA enrollment payload", 422, error);

  const demoSecret = hashSecurityValue(`${data.userId}:${data.method}:${Date.now()}`);

  return ok({
    message: "MFA enrollment implementation module created. Store hashed secret and verify TOTP before enabling.",
    method: data.method,
    secretPreview: demoSecret.slice(0, 12),
  });
}
