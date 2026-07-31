import { z } from "zod";
import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { recordTwinSignal } from "@/lib/studentTwinEngine";
import { ok } from "@/lib/http";

const schema = z.object({ signalType: z.string(), value: z.number(), unit: z.string().optional(), source: z.string(), metadata: z.any().optional() });

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/student/twin/signals", method: "POST", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  return ok({ signal: await recordTwinSignal(user.id, schema.parse(await request.json())) }, { status: 201 });
}
