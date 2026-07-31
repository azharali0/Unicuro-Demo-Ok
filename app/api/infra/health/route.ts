import { recordApiRequest } from "@/lib/apiDatabase";
import { ok, fail, parseJson } from "@/lib/api";
import { healthCheckSchema, serviceSloStatus } from "@/lib/infrastructureHardening";

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/infra/health", method: "POST", status: "REQUEST_RECEIVED" });
  const { data, error } = await parseJson(request, healthCheckSchema);
  if (error || !data) return fail("Invalid health check payload", 422, error);

  return ok({
    message: "Health check accepted. Persist to ServiceHealthCheck table.",
    sloStatus: serviceSloStatus(data.status === "Healthy" ? 99.95 : data.status === "Degraded" ? 99.6 : 98.5),
    check: data,
  });
}

export async function GET() {
  await recordApiRequest({ endpoint: "/api/infra/health", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({
    status: "Healthy",
    services: [],
    message: "Infrastructure health implementation module.",
  });
}
