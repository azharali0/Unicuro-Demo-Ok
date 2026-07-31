import { z } from "zod";
import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { startFocusSession, endFocusSession } from "@/lib/studentSurvivalEngine";
import { ok } from "@/lib/http";

const startSchema = z.object({ sessionType: z.string(), workspaceId: z.string().optional() });
const endSchema = z.object({ id: z.string() });

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/student/focus", method: "POST", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  return ok({ session: await startFocusSession(user.id, startSchema.parse(await request.json())) }, { status: 201 });
}

export async function PATCH(request: Request) {
  await recordApiRequest({ endpoint: "/api/student/focus", method: "PATCH", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  const { id } = endSchema.parse(await request.json());
  return ok({ session: await endFocusSession(user.id, id) });
}
