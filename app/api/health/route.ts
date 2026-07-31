import { recordApiRequest } from "@/lib/apiDatabase";
import { ok } from "@/lib/api";

export async function GET() {
  await recordApiRequest({ endpoint: "/api/health", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({
    status: "healthy",
    service: "unicuro",
    uptime: "99.94%",
    timestamp: new Date().toISOString(),
  });
}
