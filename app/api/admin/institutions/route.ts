import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { ok } from "@/lib/api";

export async function GET() {
  await requireRole(["ADMIN","SUPER_ADMIN"]);
  await recordApiRequest({ endpoint: "/api/admin/institutions", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({
    queue: [],
    message: "Institution admin endpoint implementation module. Connect to partner onboarding and university support.",
  });
}
