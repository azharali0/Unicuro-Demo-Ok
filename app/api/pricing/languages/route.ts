import { recordApiRequest } from "@/lib/apiDatabase";
import { NextResponse } from "next/server";
import { supportedLanguages } from "@/lib/dynamicPricing";

export async function GET() {
  await recordApiRequest({ endpoint: "/api/pricing/languages", method: "GET", status: "REQUEST_RECEIVED" });
  return NextResponse.json({ ok: true, baseLanguage: "en", languages: supportedLanguages });
}
