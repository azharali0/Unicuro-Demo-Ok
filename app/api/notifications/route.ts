import { recordApiRequest } from "@/lib/apiDatabase";
import { NextResponse } from "next/server";
import { z } from "zod";
import { requireRole } from "@/lib/auth";
import { createInAppNotification, sendEmailNotification, sendPushNotification } from "@/lib/notifications";

const schema = z.object({ userId: z.string(), title: z.string().min(2), body: z.string().min(2), channel: z.enum(["IN_APP","EMAIL","PUSH"]), email: z.string().email().optional() });

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/notifications", method: "POST", status: "REQUEST_RECEIVED" });
  await requireRole(["ADMIN", "SUPER_ADMIN"]);
  const data = schema.parse(await request.json());
  const result = data.channel === "EMAIL" ? await sendEmailNotification(data) : data.channel === "PUSH" ? await sendPushNotification(data) : await createInAppNotification(data);
  return NextResponse.json(result);
}

export async function GET() {
  await recordApiRequest({ endpoint: "/api/notifications", method: "GET", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT", "ADMIN", "SUPER_ADMIN"]);
  return NextResponse.json({ ok: true, notifications: [], userId: user.id });
}
