import { z } from "zod";
import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { createOperationContext } from "@/lib/operations/context";
import { traceStage } from "@/lib/operations/trace";
import { enqueueDomainEvent } from "@/lib/operations/queue";
import { updateCareerProfileOperation } from "@/lib/services/careerService";
import { ok } from "@/lib/http";

const schema = z.object({
  targetRole: z.string().max(200).optional(),
  skills: z.array(z.string().min(1).max(100)).max(100).optional(),
  cvUrl: z.string().url().optional(),
});

export async function PATCH(request: Request) {
  await recordApiRequest({ endpoint: "/api/student/career/profile", method: "PATCH", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  const context = createOperationContext("career.profile.update", user.id, request.headers.get("x-correlation-id") || undefined);
  const body = await traceStage(context, "API_VALIDATION", async () => schema.parse(await request.json()));
  const result = await traceStage(context, "SERVICE", () => updateCareerProfileOperation(context, user.id, body));
  const queued = await traceStage(context, "QUEUE", () => enqueueDomainEvent(result.eventId));
  return ok({ profile: result.profile, queued, correlationId: context.correlationId });
}
