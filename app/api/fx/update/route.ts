import { recordApiRequest } from "@/lib/apiDatabase";
import { NextResponse } from "next/server";
import { updateFxRatesAndPricingRules } from "@/lib/fxRates";
import { requireRole } from "@/lib/session";

export async function POST() {
  await recordApiRequest({ endpoint: "/api/fx/update", method: "POST", status: "REQUEST_RECEIVED" });
  await requireRole(["SUPER_ADMIN"]);
  const result = await updateFxRatesAndPricingRules();
  return NextResponse.json(result);
}
