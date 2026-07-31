import { recordApiRequest } from "@/lib/apiDatabase";
import { ok, fail, parseJson } from "@/lib/api";
import { ledgerEntrySchema } from "@/lib/financialHardening";

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/finance/ledger-entry", method: "POST", status: "REQUEST_RECEIVED" });
  const { data, error } = await parseJson(request, ledgerEntrySchema);
  if (error || !data) return fail("Invalid ledger entry", 422, error);

  return ok({
    message: "Double-entry ledger entry validated.",
    entry: data,
  });
}
