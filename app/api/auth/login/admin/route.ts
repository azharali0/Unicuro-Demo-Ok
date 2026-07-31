import { recordApiRequest } from "@/lib/apiDatabase";
import { NextResponse } from "next/server";
import { z } from "zod";
import { canRoleAccessPath } from "@/lib/access-control";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const schema = z.object({ email: z.string().email(), password: z.string().min(1), otp: z.string().optional(), next: z.string().optional() });

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/auth/login/admin", method: "POST", status: "REQUEST_RECEIVED" });
  const data = schema.parse(await request.json());
  
  if (!data.otp || data.otp !== "123456") {
    return NextResponse.json({ ok: false, error: "Invalid 6-digit MFA code" }, { status: 401 });
  }

  const emailLower = data.email.toLowerCase();
  const user = await prisma.user.findUnique({ where: { email: emailLower } });
  if (!user || user.role !== "ADMIN" || !user.password) {
    return NextResponse.json({ ok: false, error: "Invalid email or password" }, { status: 401 });
  }
  
  const isValid = await bcrypt.compare(data.password, user.password);
  if (!isValid) {
    return NextResponse.json({ ok: false, error: "Invalid email or password" }, { status: 401 });
  }

  const requested = data.next || "/admin";
  const redirectTo = canRoleAccessPath("ADMIN" as any, requested) ? requested : "/admin";
  const res = NextResponse.json({ ok: true, role: "ADMIN", redirectTo });
  res.cookies.set("unicuro_role", "ADMIN", { httpOnly: true, sameSite: "lax", path: "/" });
  res.cookies.set("unicuro_email", emailLower, { httpOnly: true, sameSite: "lax", path: "/" });
  res.cookies.set("unicuro_user_id", user.id, { httpOnly: true, sameSite: "lax", path: "/" });
  res.cookies.set("unicuro_mfa", "true", { httpOnly: true, sameSite: "lax", path: "/" });
  return res;
}
