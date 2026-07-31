import { z } from "zod";
import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { getStudentSettings, updateStudentSettings } from "@/lib/studentEnginesDb";
import { ok } from "@/lib/http";
const schema = z.object({
  languageCode: z.string().min(2).max(10).optional(), countryCode: z.string().min(2).max(3).optional(),
  currencyCode: z.string().length(3).optional(), timezone: z.string().optional(), email: z.boolean().optional(),
  push: z.boolean().optional(), inApp: z.boolean().optional(), marketing: z.boolean().optional(),
});
export async function GET() {
  await recordApiRequest({ endpoint: "/api/student/settings", method: "GET", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]); return ok(await getStudentSettings(user.id));
}
export async function PATCH(request: Request) {
  await recordApiRequest({ endpoint: "/api/student/settings", method: "PATCH", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]); return ok(await updateStudentSettings(user.id, schema.parse(await request.json())));
}
