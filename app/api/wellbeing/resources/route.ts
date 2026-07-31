import { recordApiRequest } from "@/lib/apiDatabase";
import { ok } from "@/lib/api";

export async function GET() {
  await recordApiRequest({ endpoint: "/api/wellbeing/resources", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({
    resources: [],
    message: "Wellbeing resources endpoint implementation module. Localise by country, university and urgency.",
  });
}
