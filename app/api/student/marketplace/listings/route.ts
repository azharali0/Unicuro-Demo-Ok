import { recordApiRequest } from "@/lib/apiDatabase";
import { z } from "zod";
import { requireRole } from "@/lib/session";
import { createMarketplaceListing, listMarketplaceListings } from "@/lib/studentEnginesDb";
import { ok } from "@/lib/http";
const schema = z.object({ title: z.string().min(2), description: z.string().min(2), category: z.string(), priceCents: z.number().int().positive(), currencyCode: z.string().min(3).max(3) });
export async function GET() {
  await recordApiRequest({ endpoint: "/api/student/marketplace/listings", method: "GET", status: "REQUEST_RECEIVED" });
  await requireRole(["STUDENT", "MERCHANT"]);
  return ok({ listings: await listMarketplaceListings() });
}
export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/student/marketplace/listings", method: "POST", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["MERCHANT"]);
  const listing = await createMarketplaceListing(user.id, schema.parse(await request.json()));
  return ok({ listing }, { status: 201 });
}
