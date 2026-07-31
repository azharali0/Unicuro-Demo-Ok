import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete("unicuro_role");
  res.cookies.delete("unicuro_email");
  res.cookies.delete("unicuro_user_id");
  res.cookies.delete("unicuro_mfa");
  return res;
}
