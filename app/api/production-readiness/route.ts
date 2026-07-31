import { recordApiRequest } from "@/lib/apiDatabase";
import { NextResponse } from "next/server";
import { assertProductionReadiness } from "@/lib/providerReadiness";

export async function GET() {
  await recordApiRequest({ endpoint: "/api/production-readiness", method: "GET", status: "REQUEST_RECEIVED" });
  const isReady = await assertProductionReadiness();
  return NextResponse.json({
    ok: isReady,
    status: isReady ? "READY" : "CONFIGURATION_REQUIRED",
  }, { status: isReady ? 200 : 428 });
}
