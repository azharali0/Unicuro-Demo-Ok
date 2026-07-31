import twilio from "twilio";
import { prisma } from "@/lib/prisma";

export async function sendSms(input: { userId?: string; to: string; body: string; templateKey: string }) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  if (!sid || !token || !from) throw new Error("TWILIO_NOT_CONFIGURED");
  const client = twilio(sid, token);
  try {
    const message = await client.messages.create({ from, to: input.to, body: input.body });
    await prisma.smsDelivery.create({ data: { userId: input.userId, phoneNumber: input.to, templateKey: input.templateKey, status: "SENT", providerId: message.sid } });
    return message;
  } catch (error: any) {
    await prisma.smsDelivery.create({ data: { userId: input.userId, phoneNumber: input.to, templateKey: input.templateKey, status: "FAILED", error: String(error?.message || error) } });
    throw error;
  }
}
