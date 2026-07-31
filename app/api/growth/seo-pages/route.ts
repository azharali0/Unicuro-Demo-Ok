import { recordApiRequest } from "@/lib/apiDatabase";
import { ok } from "@/lib/api";

export async function GET() {
  await recordApiRequest({ endpoint: "/api/growth/seo-pages", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({
    pages: [],
    message: "SEO pages endpoint implementation module. Connect to SeoLandingPage table and CMS publishing.",
  });
}
