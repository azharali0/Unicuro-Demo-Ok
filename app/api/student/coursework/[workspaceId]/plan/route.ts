import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { generateCourseworkPlan } from "@/lib/courseworkStudioEngine";
import { ok } from "@/lib/http";

export async function POST(_: Request, props: { params: Promise<{ workspaceId: string }> }) {
  const { workspaceId } = await props.params;
  await recordApiRequest({ endpoint: "/api/student/coursework/:workspaceId/plan", method: "POST", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  return ok({ outline: await generateCourseworkPlan(user.id, workspaceId) }, { status: 201 });
}
