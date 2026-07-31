import { recordApiRequest } from "@/lib/apiDatabase";
import { ok } from "@/lib/api";

export async function GET() {
  await recordApiRequest({ endpoint: "/api/super-admin/growth-metrics", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({
    blendedCac: "£1.84",
    organicSignupShare: "62%",
    referralConversion: "18.4%",
    launchConversion: "11.8%",
  });
}
