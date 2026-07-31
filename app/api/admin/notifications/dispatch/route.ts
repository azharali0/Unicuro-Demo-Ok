import { z } from "zod";
import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { createOperationContext } from "@/lib/operations/context";
import { traceStage } from "@/lib/operations/trace";
import { enqueueDomainEvent } from "@/lib/operations/queue";
import { requestNotificationOperation } from "@/lib/services/notificationService";
import { ok } from "@/lib/http";

const schema = z.object({
  userId: z.string().min(1).max(191),
  channel: z.enum(["IN_APP", "EMAIL", "SMS", "PUSH"]),
  message: z.record(z.string(), z.unknown()),
});

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/admin/notifications/dispatch", method: "POST", status: "REQUEST_RECEIVED" });
  const admin = await requireRole(["ADMIN", "SUPER_ADMIN"]);
  const context = createOperationContext("notification.dispatch", admin.id, request.headers.get("x-correlation-id") || undefined);
  const body = await traceStage(context, "API_VALIDATION", async () => schema.parse(await request.json()));
  const result = await traceStage(context, "SERVICE", () => requestNotificationOperation(context, body as any));
  const queued = await traceStage(context, "QUEUE", () => enqueueDomainEvent(result.eventId));
  return ok({ accepted: true, queued, correlationId: context.correlationId }, { status: 202 });
}
