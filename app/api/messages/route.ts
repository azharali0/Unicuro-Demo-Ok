import { recordApiRequest } from "@/lib/apiDatabase";
import { ok } from "@/lib/api";

export async function GET() {
  await recordApiRequest({ endpoint: "/api/messages", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({
    threads: [],
    message: "Message threads endpoint implementation module. Connect to MessageThread and Message tables.",
  });
}
