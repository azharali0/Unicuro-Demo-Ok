import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { getStudentTwin, generateDailyBrief } from "@/lib/studentTwinEngine";
import { ok } from "@/lib/http";

export async function GET() {
  await recordApiRequest({ endpoint: "/api/student/twin", method: "GET", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  return ok({ twin: await getStudentTwin(user.id) });
}

export async function POST() {
  await recordApiRequest({ endpoint: "/api/student/twin", method: "POST", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  return ok({ brief: await generateDailyBrief(user.id) }, { status: 201 });
}
