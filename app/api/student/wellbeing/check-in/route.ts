import { recordApiRequest } from "@/lib/apiDatabase";
import { z } from "zod";
import { requireRole } from "@/lib/session";
import { createWellbeingCheckIn } from "@/lib/studentEnginesDb";
import { ok } from "@/lib/http";
const schema = z.object({ moodScore: z.number().int().min(1).max(10), stressScore: z.number().int().min(1).max(10), note: z.string().optional() });
export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/student/wellbeing/check-in", method: "POST", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  const checkIn = await createWellbeingCheckIn(user.id, schema.parse(await request.json()));
  return ok({ checkIn }, { status: 201 });
}
