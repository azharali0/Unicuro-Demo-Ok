import { z } from "zod";
import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { getLocalisation, updateLocalisation } from "@/lib/localisationEngine";
import { ok } from "@/lib/http";
const schema = z.object({ languageCode: z.string().optional(), countryCode: z.string().optional(), currencyCode: z.string().optional(), timezone: z.string().optional() });
export async function GET() {
  await recordApiRequest({ endpoint: "/api/profile/localisation", method: "GET", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT","MERCHANT","ADMIN","SUPER_ADMIN"]);
  return ok({ preference: await getLocalisation(user.id) });
}
export async function PATCH(request: Request) {
  await recordApiRequest({ endpoint: "/api/profile/localisation", method: "PATCH", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT","MERCHANT","ADMIN","SUPER_ADMIN"]);
  return ok({ preference: await updateLocalisation(user.id, schema.parse(await request.json())) });
}
