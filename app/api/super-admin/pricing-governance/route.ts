import { recordApiRequest } from "@/lib/apiDatabase";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/session";

const schema = z.object({
  code: z.string().min(2),
  name: z.string().min(2),
  description: z.string().min(2),
  monthlyUsdCents: z.number().int().positive(),
  quarterlyUsdCents: z.number().int().positive(),
  yearlyUsdCents: z.number().int().positive(),
});

export async function GET() {
  await recordApiRequest({ endpoint: "/api/super-admin/pricing-governance", method: "GET", status: "REQUEST_RECEIVED" });
  await requireRole(["SUPER_ADMIN"]);
  const plans = await prisma.pricingPlan.findMany({ include: { rules: { include: { region: true } } } });
  return NextResponse.json({ ok: true, plans });
}

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/super-admin/pricing-governance", method: "POST", status: "REQUEST_RECEIVED" });
  await requireRole(["SUPER_ADMIN"]);
  const data = schema.parse(await request.json());
  const plan = await prisma.pricingPlan.upsert({ where: { code: data.code }, update: data, create: data });
  return NextResponse.json({ ok: true, plan });
}
