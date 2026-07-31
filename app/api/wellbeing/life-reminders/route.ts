import { recordApiRequest } from "@/lib/apiDatabase";
import { ok } from "@/lib/api";

export async function GET() {
  await recordApiRequest({ endpoint: "/api/wellbeing/life-reminders", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({
    reminders: [],
    message: "Life reminders endpoint implementation module. Connect rent, bills, visa, health and routine reminders.",
  });
}
