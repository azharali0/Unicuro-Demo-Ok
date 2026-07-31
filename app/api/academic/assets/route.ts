import { recordApiRequest } from "@/lib/apiDatabase";
import { ok, fail, parseJson } from "@/lib/api";
import { studyAssetSchema } from "@/lib/academic";

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/academic/assets", method: "POST", status: "REQUEST_RECEIVED" });
  const { data, error } = await parseJson(request, studyAssetSchema);
  if (error || !data) return fail("Invalid study asset payload", 422, error);

  return ok({
    message: "Study asset accepted. Connect to file storage, AI processing and StudyAsset table in production.",
    asset: data,
  });
}
