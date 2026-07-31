import { z } from "zod";
import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { createOperationContext } from "@/lib/operations/context";
import { traceStage } from "@/lib/operations/trace";
import { enqueueDomainEvent } from "@/lib/operations/queue";
import { updateStudentProfileOperation } from "@/lib/services/studentProfileService";
import { prisma } from "@/lib/prisma";
import { ok } from "@/lib/http";

const schema = z.object({
  course: z.string().max(200).optional(),
  preferredLanguage: z.string().min(2).max(80).optional(),
  preferredCurrency: z.string().length(3).optional(),
  internationalStudent: z.boolean().optional(),
  timezone: z.string().min(1).max(100).optional(),
});

export async function GET() {
  await recordApiRequest({ endpoint: "/api/student/profile", method: "GET", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  return ok({
    profile: await prisma.studentProfile.upsert({
      where: { userId: user.id },
      update: {},
      create: { userId: user.id },
    }),
  });
}

export async function PATCH(request: Request) {
  await recordApiRequest({ endpoint: "/api/student/profile", method: "PATCH", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  const context = createOperationContext("student.profile.update", user.id, request.headers.get("x-correlation-id") || undefined);

  const body = await traceStage(context, "API_VALIDATION", async () => schema.parse(await request.json()));
  const result = await traceStage(context, "SERVICE", () => updateStudentProfileOperation(context, user.id, body));
  const queued = await traceStage(context, "QUEUE", () => enqueueDomainEvent(result.eventId));

  return ok({ profile: result.profile, queued, correlationId: context.correlationId });
}
