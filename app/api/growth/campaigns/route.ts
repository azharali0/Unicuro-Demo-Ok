import { recordApiRequest } from "@/lib/apiDatabase";
import { ok, fail, parseJson } from "@/lib/api";
import { campaignSchema } from "@/lib/growth";

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/growth/campaigns", method: "POST", status: "REQUEST_RECEIVED" });
  const { data, error } = await parseJson(request, campaignSchema);
  if (error || !data) return fail("Invalid campaign payload", 422, error);

  return ok({
    message: "Growth campaign validated. Connect to LaunchCampaign table.",
    campaign: data,
  });
}
