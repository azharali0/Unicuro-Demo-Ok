import { recordApiRequest } from "@/lib/apiDatabase";
import { z } from "zod";
import { requireRole } from "@/lib/session";
import { createRewardEvent, listRewards } from "@/lib/rewardsEngine";
import { ok } from "@/lib/http";

const schema = z.object({ type: z.string(), source: z.string(), amountCents: z.number().int(), currencyCode: z.string().min(3).max(3), metadata: z.any().optional() });

export async function GET() {
  await recordApiRequest({ endpoint: "/api/student/rewards", method: "GET", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  return ok({ rewards: await listRewards(user.id) });
}

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/student/rewards", method: "POST", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["ADMIN", "SUPER_ADMIN"]);
  const body = schema.extend({ userId: z.string() }).parse(await request.json());
  const reward = await createRewardEvent(body);
  return ok({ reward }, { status: 201 });
}
