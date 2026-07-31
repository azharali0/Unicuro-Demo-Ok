import { recordApiRequest } from "@/lib/apiDatabase";
import { ok } from "@/lib/api";

export async function GET() {
  await recordApiRequest({ endpoint: "/api/super-admin/institution-metrics", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({
    enterpriseArr: "£296k",
    licenseUtilisationAverage: "70%",
    renewalRisk: "2 accounts",
    partnerDataCompliance: "94%",
  });
}
