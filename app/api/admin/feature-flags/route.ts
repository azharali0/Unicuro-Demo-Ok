import { z } from "zod";
import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { listFeatureFlags, setFeatureFlag } from "@/lib/featureFlagEngine";
import { ok } from "@/lib/http";
const schema = z.object({ key: z.string(), enabled: z.boolean(), rules: z.any().optional() });
export async function GET() {
  await recordApiRequest({ endpoint: "/api/admin/feature-flags", method: "GET", status: "REQUEST_RECEIVED" });
  await requireRole(["ADMIN","SUPER_ADMIN"]);
  return ok({ flags: await listFeatureFlags() });
}
export async function PATCH(request: Request) {
  await recordApiRequest({ endpoint: "/api/admin/feature-flags", method: "PATCH", status: "REQUEST_RECEIVED" });
  await requireRole(["SUPER_ADMIN"]);
  const b = schema.parse(await request.json());
  return ok({ flag: await setFeatureFlag(b.key, b.enabled, b.rules) });
}
