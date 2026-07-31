import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { ok } from "@/lib/api";

export async function GET() {
  await requireRole(["ADMIN","SUPER_ADMIN"]);
  await recordApiRequest({ endpoint: "/api/admin/wellbeing", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({
    queue: [],
    message: "Wellbeing admin endpoint implementation module. Avoid exposing sensitive individual health data to general admins.",
  });
}
