import { z } from "zod";
import { recordApiRequest } from "@/lib/apiDatabase";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const schema = z.object({ email: z.string().email(), password: z.string().min(6), name: z.string().min(1), role: z.enum(["STUDENT","ADMIN","MERCHANT"]) });
export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/auth/register", method: "POST", status: "REQUEST_RECEIVED" });
  const body = schema.parse(await request.json());
  const emailLower = body.email.toLowerCase();
  // Check if user already exists
  const existing = await prisma.user.findUnique({ where: { email: emailLower } });
  if (existing) {
    return NextResponse.json({ ok: false, error: "Email already in use" }, { status: 400 });
  }

  const password = await bcrypt.hash(body.password, 10);
  
  // Create user
  const user = await prisma.user.create({
    data: {
      email: emailLower,
      password: password,
      name: body.name,
      role: body.role,
    }
  });

  // Automatically log them in by setting cookies
  const res = NextResponse.json({ ok: true, redirectTo: "/onboarding" });
  res.cookies.set("unicuro_role", user.role, { httpOnly: true, sameSite: "lax", path: "/" });
  res.cookies.set("unicuro_email", user.email, { httpOnly: true, sameSite: "lax", path: "/" });
  res.cookies.set("unicuro_user_id", user.id, { httpOnly: true, sameSite: "lax", path: "/" });
  res.cookies.set("unicuro_mfa", "false", { httpOnly: true, sameSite: "lax", path: "/" });
  return res;
}
