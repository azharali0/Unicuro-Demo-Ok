import { listPendingDomainEvents } from "@/lib/operations/outbox";
import { enqueueDomainEvent } from "@/lib/operations/queue";

export async function dispatchPendingDomainEvents(limit = 100) {
  const events = await listPendingDomainEvents(limit);
  const results = [];
  for (const event of events) {
    results.push(await enqueueDomainEvent(event.id));
  }
  return results;
}
