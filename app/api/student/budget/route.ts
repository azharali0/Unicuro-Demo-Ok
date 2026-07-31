import { z } from "zod";
import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { createBudget, getBudget } from "@/lib/studentSurvivalEngine";
import { ok } from "@/lib/http";

const schema = z.object({ currencyCode: z.string().length(3), periodStart: z.string().datetime(), periodEnd: z.string().datetime(), incomeCents: z.number().int(), savingsTargetCents: z.number().int().optional() });

export async function GET() {
  await recordApiRequest({ endpoint: "/api/student/budget", method: "GET", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  return ok({ budget: await getBudget(user.id) });
}

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/student/budget", method: "POST", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  const body = schema.parse(await request.json());
  return ok({ budget: await createBudget(user.id, { ...body, periodStart: new Date(body.periodStart), periodEnd: new Date(body.periodEnd) }) }, { status: 201 });
}
