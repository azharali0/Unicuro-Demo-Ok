import { recordApiRequest } from "@/lib/apiDatabase";
import { ok, fail, parseJson } from "@/lib/api";
import { syncItemSchema, shouldRetrySync } from "@/lib/mobile";

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/mobile/sync", method: "POST", status: "REQUEST_RECEIVED" });
  const { data, error } = await parseJson(request, syncItemSchema);
  if (error || !data) return fail("Invalid sync payload", 422, error);

  return ok({
    queued: true,
    retryAllowed: shouldRetrySync(0),
    message: "Sync item accepted. Connect to OfflineSyncItem queue.",
  });
}
