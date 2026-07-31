import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { ok } from "@/lib/api";

export async function GET() {
  await requireRole(["ADMIN","SUPER_ADMIN"]);
  await recordApiRequest({ endpoint: "/api/admin/users", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({
    users: [],
    message: "Admin user list endpoint implementation module. Connect to Prisma User table.",
  });
}
