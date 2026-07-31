import { recordApiRequest } from "@/lib/apiDatabase";
import { ok } from "@/lib/api";
export async function GET() {
  await recordApiRequest({ endpoint: "/api/pilot/health", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({ health: "Pilot Ready", message: "Pilot health implementation module." });
}
