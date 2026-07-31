import { recordApiRequest } from "@/lib/apiDatabase";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fallbackRegions } from "@/lib/dynamicPricing";

export async function GET() {
  await recordApiRequest({ endpoint: "/api/pricing/regions", method: "GET", status: "REQUEST_RECEIVED" });
  try {
    const regions = await prisma.pricingRegion.findMany({ where: { active: true }, orderBy: { countryName: "asc" } });
    return NextResponse.json({ ok: true, source: "database", regions });
  } catch {
    return NextResponse.json({ ok: true, source: "fallback", regions: fallbackRegions });
  }
}
