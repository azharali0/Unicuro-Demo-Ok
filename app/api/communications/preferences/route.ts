import { recordApiRequest } from "@/lib/apiDatabase";
import { ok } from "@/lib/api";

export async function GET() {
  await recordApiRequest({ endpoint: "/api/communications/preferences", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({
    preferences: [],
    message: "Email/notification preferences implementation module. Connect to EmailPreference table.",
  });
}
