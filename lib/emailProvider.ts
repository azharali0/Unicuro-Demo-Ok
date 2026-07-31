import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

export async function sendEmail(input: { userId?: string; to: string; subject: string; html: string; templateKey: string }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_NOT_CONFIGURED");
  const resend = new Resend(key);
  const from = process.env.EMAIL_FROM;
  if (!from) throw new Error("EMAIL_FROM_NOT_CONFIGURED");
  try {
    const result = await resend.emails.send({ from, to: input.to, subject: input.subject, html: input.html });
    await prisma.emailDelivery.create({ data: { userId: input.userId, toEmail: input.to, subject: input.subject, templateKey: input.templateKey, status: "SENT", providerId: result.data?.id || null } });
    return result;
  } catch (error: any) {
    await prisma.emailDelivery.create({ data: { userId: input.userId, toEmail: input.to, subject: input.subject, templateKey: input.templateKey, status: "FAILED", error: String(error?.message || error) } });
    throw error;
  }
}
