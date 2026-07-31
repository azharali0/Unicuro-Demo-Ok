import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { listDeals } from "@/lib/studentEnginesDb";
import { ok } from "@/lib/http";
export async function GET(request: Request) {
  await recordApiRequest({ endpoint: "/api/student/discounts", method: "GET", status: "REQUEST_RECEIVED" });
  await requireRole(["STUDENT", "MERCHANT"]);
  const url = new URL(request.url);
  const premium = url.searchParams.get("includePremium") === "true";
  return ok({ deals: await listDeals(url.searchParams.get("countryCode") || undefined, premium) });
}
