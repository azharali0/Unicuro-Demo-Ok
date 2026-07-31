import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { ok } from "@/lib/api";

export async function GET() {
  await requireRole(["ADMIN","SUPER_ADMIN"]);
  await recordApiRequest({ endpoint: "/api/admin/academic", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({
    queue: [],
    message: "Academic admin moderation endpoint implementation module.",
  });
}
