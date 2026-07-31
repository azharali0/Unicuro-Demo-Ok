import { prisma } from "@/lib/prisma";
export async function enqueueJob(queue: string, jobType: string, payload: any, scheduledAt?: Date) {
  return prisma.backgroundJob.create({ data: { queue, jobType, payload, scheduledAt } });
}
export async function listJobs(status?: string) {
  return prisma.backgroundJob.findMany({ where: status ? { status } : {}, orderBy: { createdAt: "desc" }, take: 200 });
}
export async function updateJobStatus(id: string, status: string, error?: string) {
  return prisma.backgroundJob.update({ where: { id }, data: { status, error, ...(status === "COMPLETED" ? { completedAt: new Date() } : {}), ...(status === "FAILED" ? { failedAt: new Date() } : {}) } });
}
