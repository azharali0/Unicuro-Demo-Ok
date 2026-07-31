import { recordApiRequest } from "@/lib/apiDatabase";
import { ok, fail, parseJson } from "@/lib/api";
import { universityPartnerSchema, licenseHealth, licenseUtilisation } from "@/lib/institution";

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/institution/partners", method: "POST", status: "REQUEST_RECEIVED" });
  const { data, error } = await parseJson(request, universityPartnerSchema);
  if (!data) return fail("INVALID_DATA", 400);

  const utilisation = licenseUtilisation(0, data.seats);

  return ok({
    partner: data,
    utilisation,
    health: licenseHealth(utilisation),
  });
}
