import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import type { DomainEventEnvelope } from "@/lib/operations/types";

export async function createDomainEvent(
  tx: Prisma.TransactionClient,
  input: {
    aggregateType: string;
    aggregateId: string;
    eventType: string;
    payload: unknown;
  }
) {
  return tx.domainEvent.create({
    data: {
      aggregateType: input.aggregateType,
      aggregateId: input.aggregateId,
      eventType: input.eventType,
      payload: input.payload as any,
      status: "PENDING",
    },
  });
}

export async function listPendingDomainEvents(limit = 100) {
  return prisma.domainEvent.findMany({
    where: { status: { in: ["PENDING", "RETRY"] } },
    orderBy: { occurredAt: "asc" },
    take: limit,
  });
}

export function toEnvelope(event: {
  id: string;
  aggregateType: string;
  aggregateId: string;
  eventType: string;
  payload: unknown;
  occurredAt: Date;
}): DomainEventEnvelope {
  return {
    id: event.id,
    aggregateType: event.aggregateType,
    aggregateId: event.aggregateId,
    eventType: event.eventType,
    payload: event.payload,
    occurredAt: event.occurredAt.toISOString(),
  };
}
