import { recordApiRequest } from "@/lib/apiDatabase";
import { ok } from "@/lib/api";

export async function GET() {
  await recordApiRequest({ endpoint: "/api/mobile/widgets", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({
    widgets: [],
    message: "Mobile widget endpoint implementation module. Connect to MobileWidgetPreference.",
  });
}
