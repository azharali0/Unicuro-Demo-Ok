import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { searchGlobal } from "@/lib/globalSearchEngine";
import { ok } from "@/lib/http";
export async function GET(request: Request) {
  await recordApiRequest({ endpoint: "/api/search", method: "GET", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT","MERCHANT","ADMIN","SUPER_ADMIN"]);
  const url = new URL(request.url);
  return ok({ results: await searchGlobal({ query: url.searchParams.get("q") || "", userId: user.id, countryCode: url.searchParams.get("countryCode") || undefined }) });
}
