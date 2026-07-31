import { recordApiRequest } from "@/lib/apiDatabase";
import { ok, fail, parseJson } from "@/lib/api";
import { waitlistSchema } from "@/lib/growth";

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/growth/waitlist", method: "POST", status: "REQUEST_RECEIVED" });
  const { data, error } = await parseJson(request, waitlistSchema);
  if (error || !data) return fail("Invalid waitlist payload", 422, error);

  return ok({
    message: "Waitlist signup accepted. Connect to WaitlistEntry table and email automation.",
    entry: data,
  });
}
