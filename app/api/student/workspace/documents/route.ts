import { z } from "zod";
import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { createWorkspaceDocument, listWorkspaceDocuments } from "@/lib/studentWorkspaceEngine";
import { ok } from "@/lib/http";

const schema = z.object({ title: z.string().min(2), documentType: z.string(), content: z.any(), workspaceId: z.string().optional() });

export async function GET() {
  await recordApiRequest({ endpoint: "/api/student/workspace/documents", method: "GET", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  return ok({ documents: await listWorkspaceDocuments(user.id) });
}

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/student/workspace/documents", method: "POST", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  return ok({ document: await createWorkspaceDocument(user.id, schema.parse(await request.json())) }, { status: 201 });
}
