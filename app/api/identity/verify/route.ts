import { recordApiRequest } from "@/lib/apiDatabase";
import { z } from "zod";
import { ok, fail, parseJson } from "@/lib/api";

const verifySchema = z.object({
  userId: z.string().min(1),
  type: z.enum(["University Email", "Student ID", "Enrollment", "Phone", "Identity", "Graduation"]),
  evidenceUrl: z.string().url().optional(),
});

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/identity/verify", method: "POST", status: "REQUEST_RECEIVED" });
  const { data, error } = await parseJson(request, verifySchema);
  if (error || !data) return fail("Invalid verification payload", 422, error);

  return ok({
    message: "Verification request accepted. Connect to manual/admin queue in production.",
    verification: data,
  });
}
