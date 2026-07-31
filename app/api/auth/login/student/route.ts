import { recordApiRequest } from "@/lib/apiDatabase";
import { NextResponse } from "next/server";
import { z } from "zod";
import { canRoleAccessPath } from "@/lib/access-control";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const schema = z.object({ email: z.string().email(), password: z.string().min(1), next: z.string().optional() });

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/auth/login/student", method: "POST", status: "REQUEST_RECEIVED" });
  const data = schema.parse(await request.json());

  const emailLower = data.email.toLowerCase();
  const user = await prisma.user.findUnique({ where: { email: emailLower } });
  if (!user || user.role !== "STUDENT" || !user.password) {
    return NextResponse.json({ ok: false, error: "Invalid email or password" }, { status: 401 });
  }
  
  const isValid = await bcrypt.compare(data.password, user.password);
  if (!isValid) {
    return NextResponse.json({ ok: false, error: "Invalid email or password" }, { status: 401 });
  }

  // Redirect to onboarding to ensure profile is complete
  const requested = data.next || "/onboarding";
  const redirectTo = "/onboarding";
  
  const res = NextResponse.json({ ok: true, role: "STUDENT", redirectTo });
  res.cookies.set("unicuro_role", "STUDENT", { httpOnly: true, sameSite: "lax", path: "/" });
  res.cookies.set("unicuro_email", emailLower, { httpOnly: true, sameSite: "lax", path: "/" });
  res.cookies.set("unicuro_user_id", user.id, { httpOnly: true, sameSite: "lax", path: "/" });
  res.cookies.set("unicuro_mfa", "false", { httpOnly: true, sameSite: "lax", path: "/" });
  return res;
}
