import { z } from "zod";
import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { listSavedItems, saveItem, removeSavedItem } from "@/lib/savedItemsEngine";
import { ok } from "@/lib/http";
const schema = z.object({ entityType: z.string(), entityId: z.string(), route: z.string(), title: z.string() });
export async function GET() {
  await recordApiRequest({ endpoint: "/api/saved", method: "GET", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT","MERCHANT"]);
  return ok({ items: await listSavedItems(user.id) });
}
export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/saved", method: "POST", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT","MERCHANT"]);
  return ok({ item: await saveItem(user.id, schema.parse(await request.json())) }, { status: 201 });
}
export async function DELETE(request: Request) {
  await recordApiRequest({ endpoint: "/api/saved", method: "DELETE", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT","MERCHANT"]);
  const body = schema.pick({ entityType: true, entityId: true }).parse(await request.json());
  return ok({ item: await removeSavedItem(user.id, body.entityType, body.entityId) });
}
