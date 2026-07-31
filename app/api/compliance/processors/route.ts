import { recordApiRequest } from "@/lib/apiDatabase";
import { ok } from "@/lib/api";

export async function GET() {
  await recordApiRequest({ endpoint: "/api/compliance/processors", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({
    processors: [],
    message: "Third-party processor register implementation module. Connect to ThirdPartyProcessor table.",
  });
}
