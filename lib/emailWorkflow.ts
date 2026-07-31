import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { otpEmailTemplate, alertEmailTemplate, scholarshipAlertTemplate, discountAlertTemplate } from "@/lib/emailTemplates";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const templates: Record<string, (...args: any[]) => { subject: string; html: string }> = {
  otp: otpEmailTemplate,
  alert: alertEmailTemplate,
  scholarship: scholarshipAlertTemplate,
  discount: discountAlertTemplate,
};

export async function sendTemplatedEmail(input: {
  userId?: string;
  toEmail: string;
  templateKey: "otp" | "alert" | "scholarship" | "discount";
  args: any[];
}) {
  const template = templates[input.templateKey](...input.args);

  if (!resend) {
    return prisma.emailDelivery.create({
      data: { userId: input.userId, toEmail: input.toEmail, templateKey: input.templateKey, subject: template.subject, status: "FAILED", error: "RESEND_NOT_CONFIGURED" },
    });
  }

  try {
    const result = await resend.emails.send({
      from: process.env.FROM_EMAIL || "UniCuro <hello@unicuro.com>",
      to: input.toEmail,
      subject: template.subject,
      html: template.html,
    });

    return prisma.emailDelivery.create({
      data: { userId: input.userId, toEmail: input.toEmail, templateKey: input.templateKey, subject: template.subject, status: "SENT", providerId: (result as any).data?.id, sentAt: new Date() },
    });
  } catch (error: any) {
    return prisma.emailDelivery.create({
      data: { userId: input.userId, toEmail: input.toEmail, templateKey: input.templateKey, subject: template.subject, status: "FAILED", error: error?.message || "SEND_FAILED" },
    });
  }
}
