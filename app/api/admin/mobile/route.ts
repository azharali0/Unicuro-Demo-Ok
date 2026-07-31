import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { ok } from "@/lib/api";

export async function GET() {
  await requireRole(["ADMIN","SUPER_ADMIN"]);
  await recordApiRequest({ endpoint: "/api/admin/mobile", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({
    queue: [],
    message: "Mobile admin endpoint implementation module. Connect to install, sync, push and mobile support analytics.",
  });
}
