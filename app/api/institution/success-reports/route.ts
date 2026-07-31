import { recordApiRequest } from "@/lib/apiDatabase";
import { ok } from "@/lib/api";

export async function GET() {
  await recordApiRequest({ endpoint: "/api/institution/success-reports", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({
    reports: [],
    message: "Student success reports endpoint implementation module. Aggregate anonymised institution-level outcomes.",
  });
}
