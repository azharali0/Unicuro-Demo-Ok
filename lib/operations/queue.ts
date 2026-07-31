import { Queue } from "bullmq";
import IORedis from "ioredis";
import { prisma } from "@/lib/prisma";
import { toEnvelope } from "@/lib/operations/outbox";

let queue: Queue | null = null;

function getQueue() {
  if (queue) return queue;
  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) throw new Error("REDIS_URL_NOT_CONFIGURED");
  const connection = new IORedis(redisUrl, { maxRetriesPerRequest: null });
  queue = new Queue("unicuro-domain-events", { connection });
  return queue;
}

export async function enqueueDomainEvent(eventId: string) {
  const event = await prisma.domainEvent.findUnique({ where: { id: eventId } });
  if (!event) throw new Error("DOMAIN_EVENT_NOT_FOUND");

  const q = getQueue();
  await q.add(event.eventType, toEnvelope(event), {
    jobId: event.id,
    attempts: 5,
    backoff: { type: "exponential", delay: 1000 },
    removeOnComplete: 500,
    removeOnFail: 1000,
  });

  await prisma.domainEvent.update({
    where: { id: event.id },
    data: { status: "QUEUED" },
  });

  return { queued: true, eventId: event.id };
}
