import { recordApiRequest } from "@/lib/apiDatabase";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/session";

export async function GET() {
  await recordApiRequest({ endpoint: "/api/admin/pricing", method: "GET", status: "REQUEST_RECEIVED" });
  await requireRole(["ADMIN"]);
  const regions = await prisma.pricingRegion.findMany({ include: { rules: true }, orderBy: { countryName: "asc" } });
  return NextResponse.json({ ok: true, regions });
}
