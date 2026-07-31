import { prisma } from "@/lib/prisma";
import { createDomainEvent } from "@/lib/operations/outbox";
import type { OperationContext } from "@/lib/operations/types";
import { traceStage } from "@/lib/operations/trace";

export type RequestNotificationInput = {
  userId: string;
  channel: "IN_APP" | "EMAIL" | "SMS" | "PUSH";
  message: Record<string, unknown>;
};

export async function requestNotificationOperation(
  context: OperationContext,
  input: RequestNotificationInput
) {
  return traceStage(context, "DATABASE_TRANSACTION", () =>
    prisma.$transaction(async (tx) => {
      const event = await createDomainEvent(tx, {
        aggregateType: "Notification",
        aggregateId: input.userId,
        eventType: "notification.requested",
        payload: input,
      });
      return { accepted: true, eventId: event.id };
    })
  );
}
