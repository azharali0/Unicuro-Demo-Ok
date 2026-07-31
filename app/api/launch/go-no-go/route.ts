import { recordApiRequest } from "@/lib/apiDatabase";
import { ok } from "@/lib/api";

export async function GET() {
  await recordApiRequest({ endpoint: "/api/launch/go-no-go", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({
    decision: "Conditional Go",
    blockers: ["Stripe live webhook tests", "Admin MFA", "Cookie consent review"],
  });
}
