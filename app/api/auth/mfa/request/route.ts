import { z } from "zod";
import { recordApiRequest } from "@/lib/apiDatabase";
import { createAuthCode } from "@/lib/authEngine";
import { sendEmail } from "@/lib/emailProvider";
import { sendSms } from "@/lib/smsProvider";
import { prisma } from "@/lib/prisma";
import { ok } from "@/lib/http";
const schema = z.object({ userId: z.string(), channel: z.enum(["EMAIL","SMS"]) });
export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/auth/mfa/request", method: "POST", status: "REQUEST_RECEIVED" });
  const body = schema.parse(await request.json());
  const user = await prisma.userAccount.findUnique({ where: { id: body.userId } });
  if (!user) throw new Error("USER_NOT_FOUND");
  const { code } = await createAuthCode(user.id, "MFA");
  if (body.channel === "EMAIL") await sendEmail({ userId: user.id, to: user.email, subject: "Your UniCuro MFA code", html: `<p>${code}</p>`, templateKey: "MFA" });
  else {
    if (!user.phoneNumber) throw new Error("PHONE_NOT_CONFIGURED");
    await sendSms({ userId: user.id, to: user.phoneNumber, body: `Your UniCuro MFA code is ${code}`, templateKey: "MFA" });
  }
  return ok({ sent: true });
}
