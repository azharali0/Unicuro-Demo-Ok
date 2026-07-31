import { z } from "zod";
import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { createHabit, listHabits } from "@/lib/studentSurvivalEngine";
import { ok } from "@/lib/http";

const schema = z.object({ title: z.string().min(2), category: z.string(), targetCount: z.number().int().positive().optional(), frequency: z.string() });

export async function GET() {
  await recordApiRequest({ endpoint: "/api/student/habits", method: "GET", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  return ok({ habits: await listHabits(user.id) });
}

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/student/habits", method: "POST", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  return ok({ habit: await createHabit(user.id, schema.parse(await request.json())) }, { status: 201 });
}
