import { recordApiRequest } from "@/lib/apiDatabase";
import { NextResponse } from "next/server";
import { detectCountryFromHeaders, getDynamicPricing, pricingRequestSchema } from "@/lib/dynamicPricing";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  await recordApiRequest({ endpoint: "/api/pricing/current", method: "GET", status: "REQUEST_RECEIVED" });
  const url = new URL(request.url);
  const parsed = pricingRequestSchema.parse({
    countryCode: url.searchParams.get("countryCode") || detectCountryFromHeaders(request.headers),
    languageCode: url.searchParams.get("languageCode") || "en",
    planCode: url.searchParams.get("planCode") || "STUDENT_PREMIUM",
    promoCode: url.searchParams.get("promoCode") || undefined,
  });
  return NextResponse.json({ ok: true, pricing: await getDynamicPricing({ ...parsed, prisma }) });
}
