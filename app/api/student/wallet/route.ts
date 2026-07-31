import { recordApiRequest } from "@/lib/apiDatabase";
import { requireRole } from "@/lib/session";
import { getWalletSummary } from "@/lib/studentEnginesDb";
import { ok } from "@/lib/http";
export async function GET() {
  await recordApiRequest({ endpoint: "/api/student/wallet", method: "GET", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  return ok({ wallet: await getWalletSummary(user.id) });
}
