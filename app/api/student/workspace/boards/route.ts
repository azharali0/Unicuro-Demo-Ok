import { z } from "zod";
import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { createWorkspaceBoard, listWorkspaceBoards } from "@/lib/studentWorkspaceEngine";
import { ok } from "@/lib/http";

const schema = z.object({ title: z.string().min(2), boardType: z.string().min(2), content: z.any() });

export async function GET() {
  await recordApiRequest({ endpoint: "/api/student/workspace/boards", method: "GET", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  return ok({ boards: await listWorkspaceBoards(user.id) });
}

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/student/workspace/boards", method: "POST", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  return ok({ board: await createWorkspaceBoard(user.id, schema.parse(await request.json())) }, { status: 201 });
}
