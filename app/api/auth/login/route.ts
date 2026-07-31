import { z } from "zod";
import { cookies } from "next/headers";
import { recordApiRequest } from "@/lib/apiDatabase";
import { authenticatePassword } from "@/lib/authEngine";
import { ok } from "@/lib/http";
const schema = z.object({ email: z.string().email(), password: z.string().min(1) });
export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/auth/login", method: "POST", status: "REQUEST_RECEIVED" });
  const body = schema.parse(await request.json());
  const user = await authenticatePassword(body.email, body.password);
  const jar = await cookies();
  jar.set("unicuro_user_id", user.id, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/" });
  jar.set("unicuro_role", user.role, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/" });
  return ok({ userId: user.id, role: user.role });
}
