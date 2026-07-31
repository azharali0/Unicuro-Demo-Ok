import { z } from "zod";
import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { createTicket, listTickets } from "@/lib/supportEngine";
import { ok } from "@/lib/http";
const schema = z.object({ subject: z.string().min(2), category: z.string(), description: z.string().min(5), priority: z.string().optional() });
export async function GET() {
  await recordApiRequest({ endpoint: "/api/support", method: "GET", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT","MERCHANT","ADMIN","SUPER_ADMIN"]);
  return ok({ tickets: await listTickets(user.id) });
}
export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/support", method: "POST", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT","MERCHANT","ADMIN","SUPER_ADMIN"]);
  return ok({ ticket: await createTicket(user.id, schema.parse(await request.json())) }, { status: 201 });
}
