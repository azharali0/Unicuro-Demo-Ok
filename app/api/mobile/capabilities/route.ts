import { recordApiRequest } from "@/lib/apiDatabase";
import { ok } from "@/lib/api";

export async function GET() {
  await recordApiRequest({ endpoint: "/api/mobile/capabilities", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({
    capabilities: [],
    message: "Device capability endpoint implementation module. Connect to consent and device support detection.",
  });
}
