import { Worker } from "bullmq";
import IORedis from "ioredis";
import { prisma } from "@/lib/prisma";
import { executeDomainEngine } from "@/lib/operations/engineRegistry";

const redisUrl = process.env.REDIS_URL;
if (!redisUrl) throw new Error("REDIS_URL_NOT_CONFIGURED");

const connection = new IORedis(redisUrl, { maxRetriesPerRequest: null });

const worker = new Worker(
  "unicuro-domain-events",
  async (job) => {
    const startedAt = Date.now();
    const execution = await prisma.workerExecution.create({
      data: {
        eventId: String(job.id),
        workerName: "domain-worker",
        jobName: job.name,
        status: "STARTED",
        attempt: job.attemptsMade + 1,
      },
    });

    try {
      const result = await executeDomainEngine(job.name, job.data.payload);
      await prisma.$transaction([
        prisma.workerExecution.update({
          where: { id: execution.id },
          data: {
            status: "SUCCEEDED",
            completedAt: new Date(),
            durationMs: Date.now() - startedAt,
            result: result as any,
          },
        }),
        prisma.domainEvent.update({
          where: { id: String(job.id) },
          data: { status: "PROCESSED", processedAt: new Date() },
        }),
      ]);
      return result;
    } catch (error: any) {
      await prisma.$transaction([
        prisma.workerExecution.update({
          where: { id: execution.id },
          data: {
            status: "FAILED",
            completedAt: new Date(),
            durationMs: Date.now() - startedAt,
            error: String(error?.message || error),
          },
        }),
        prisma.domainEvent.update({
          where: { id: String(job.id) },
          data: {
            status: job.attemptsMade + 1 >= 5 ? "FAILED" : "RETRY",
            attempts: { increment: 1 },
            error: String(error?.message || error),
          },
        }),
      ]);
      throw error;
    }
  },
  { connection, concurrency: Number(process.env.DOMAIN_WORKER_CONCURRENCY || 10) }
);

worker.on("completed", (job) => console.log("completed", job.id, job.name));
worker.on("failed", (job, error) => console.error("failed", job?.id, error));
