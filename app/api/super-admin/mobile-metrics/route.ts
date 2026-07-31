import { recordApiRequest } from "@/lib/apiDatabase";
import { ok } from "@/lib/api";

export async function GET() {
  await recordApiRequest({ endpoint: "/api/super-admin/mobile-metrics", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({
    mobileRetentionLift: "+34%",
    pwaInstallConversion: "41%",
    pushOptIn: "64%",
    offlineCacheHitRate: "78%",
  });
}
