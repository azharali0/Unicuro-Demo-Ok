import { z } from "zod";
import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { createOperationContext } from "@/lib/operations/context";
import { traceStage } from "@/lib/operations/trace";
import { enqueueDomainEvent } from "@/lib/operations/queue";
import { createCourseworkOperation } from "@/lib/services/courseworkService";
import { listCoursework } from "@/lib/courseworkStudioEngine";
import { evaluateAcademicIntegrityPrompt } from "@/lib/academicIntegrityEngine";
import { ok } from "@/lib/http";

const schema = z.object({
  title: z.string().min(2).max(200),
  courseName: z.string().max(200).optional(),
  assignmentType: z.string().min(2).max(100),
  briefText: z.string().min(10).max(20000),
  deadlineAt: z.string().datetime().optional(),
  wordTarget: z.number().int().positive().max(100000).optional(),
});

export async function GET() {
  await recordApiRequest({ endpoint: "/api/student/coursework", method: "GET", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  return ok({ coursework: await listCoursework(user.id) });
}

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/student/coursework", method: "POST", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  const context = createOperationContext("coursework.create", user.id, request.headers.get("x-correlation-id") || undefined);

  const body = await traceStage(context, "API_VALIDATION", async () => schema.parse(await request.json()));
  const integrity = evaluateAcademicIntegrityPrompt(body.briefText);
  if (integrity.blocked) {
    return Response.json({ ok: false, error: "ACADEMIC_INTEGRITY_RESTRICTION", guidance: integrity.guidance }, { status: 422 });
  }

  const result = await traceStage(context, "SERVICE", () =>
    createCourseworkOperation(context, user.id, {
      ...body,
      deadlineAt: body.deadlineAt ? new Date(body.deadlineAt) : undefined,
    })
  );
  const queued = await traceStage(context, "QUEUE", () => enqueueDomainEvent(result.eventId));
  return ok({ coursework: result.coursework, queued, correlationId: context.correlationId }, { status: 201 });
}
