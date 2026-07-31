import { z } from "zod";
import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { askAcademicAssistant } from "@/lib/aiAcademic";
import { ok } from "@/lib/http";
const schema = z.object({ prompt: z.string().min(2) });
export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/academic/assistant", method: "POST", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT","MERCHANT"]);
  return ok(await askAcademicAssistant(user.id, schema.parse(await request.json()).prompt));
}
