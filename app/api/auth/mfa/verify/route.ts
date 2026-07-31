import { z } from "zod";
import { cookies } from "next/headers";
import { recordApiRequest } from "@/lib/apiDatabase";
import { verifyAuthCode } from "@/lib/authEngine";
import { ok } from "@/lib/http";
const schema = z.object({ userId: z.string(), code: z.string().length(6) });
export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/auth/mfa/verify", method: "POST", status: "REQUEST_RECEIVED" });
  const body = schema.parse(await request.json());
  const verified = await verifyAuthCode(body.userId, "MFA", body.code);
  if (!verified) return Response.json({ ok: false, error: "INVALID_MFA_CODE" }, { status: 401 });
  const jar = await cookies();
  jar.set("unicuro_mfa", "true", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/" });
  return ok({ status: "VERIFIED" });
}
