import { recordApiRequest } from "@/lib/apiDatabase";
import { ok, fail, parseJson } from "@/lib/api";
import { activationRate, pilotHealth, pilotMetricSchema } from "@/lib/universityPilot";

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/pilot-launch/adoption", method: "POST", status: "REQUEST_RECEIVED" });
  const { data, error } = await parseJson(request, pilotMetricSchema);
  if (error || !data) return fail("Invalid pilot adoption metrics", 422, error);

  const rate = activationRate(data.activeUsers, data.totalInvited);
  const supportTicketRate = Math.round((data.supportTickets / data.totalInvited) * 100);

  return ok({
    activationRate: rate,
    health: pilotHealth({ activationRate: rate, weeklyRetention: data.weeklyRetention, supportTicketRate }),
    message: "Pilot adoption metrics accepted.",
  });
}

export async function GET() {
  await recordApiRequest({ endpoint: "/api/pilot-launch/adoption", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({ metrics: [], message: "Pilot adoption metrics implementation module." });
}
