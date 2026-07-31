import { recordApiRequest } from "@/lib/apiDatabase";
import { ok, fail, parseJson } from "@/lib/api";
import { securityEventSchema } from "@/lib/securityHardening";

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/security/events", method: "POST", status: "REQUEST_RECEIVED" });
  const { data, error } = await parseJson(request, securityEventSchema);
  if (error || !data) return fail("Invalid security event payload", 422, error);

  return ok({
    message: "Security event accepted. Persist to SecurityEvent table in production.",
    event: data,
  });
}

export async function GET() {
  await recordApiRequest({ endpoint: "/api/security/events", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({
    events: [],
    message: "Security events endpoint implementation module. Connect to SecurityEvent table.",
  });
}
