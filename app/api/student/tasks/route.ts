import { recordApiRequest } from "@/lib/apiDatabase";
import { z } from "zod";
import { requireRole } from "@/lib/session";
import { createStudentTask, listStudentTasks } from "@/lib/studentEnginesDb";
import { ok } from "@/lib/http";
const schema = z.object({ title: z.string().min(2), description: z.string().optional(), category: z.string().default("personal"), priority: z.string().default("MEDIUM"), dueAt: z.string().datetime().optional() });
export async function GET() {
  await recordApiRequest({ endpoint: "/api/student/tasks", method: "GET", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  return ok({ tasks: await listStudentTasks(user.id) });
}
export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/student/tasks", method: "POST", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  const body = schema.parse(await request.json());
  const task = await createStudentTask(user.id, { ...body, dueAt: body.dueAt ? new Date(body.dueAt) : undefined });
  return ok({ task }, { status: 201 });
}
