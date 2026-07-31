import { z } from "zod";
import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { dispatchPendingDomainEvents } from "@/lib/operations/dispatcher";
import { ok } from "@/lib/http";

const schema = z.object({ limit: z.number().int().min(1).max(500).default(100) });

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/admin/operations/dispatch", method: "POST", status: "REQUEST_RECEIVED" });
  await requireRole(["ADMIN", "SUPER_ADMIN"]);
  const body = schema.parse(await request.json());
  return ok({ results: await dispatchPendingDomainEvents(body.limit) });
}
