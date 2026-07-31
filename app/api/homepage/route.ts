import { getPublishedHomepage } from "@/lib/homepageService";
import { recordApiRequest } from "@/lib/apiDatabase";

export async function GET() {
  await recordApiRequest({ endpoint: "/api/homepage", method: "GET", status: "REQUEST_RECEIVED" });
  const data = await getPublishedHomepage();
  return Response.json({ ok: data.ready, ...data }, { status: data.ready ? 200 : 404 });
}
