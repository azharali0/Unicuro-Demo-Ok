import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
export async function GET() {
  const [pending, failed, traces, workers] = await Promise.all([
    prisma.domainEvent.count({ where: { status: { in: ["PENDING", "QUEUED", "RETRY"] } } }),
    prisma.domainEvent.count({ where: { status: "FAILED" } }),
    prisma.operationTrace.count(),
    prisma.workerExecution.count({ where: { status: "FAILED" } }),
  ]);
  const body = [
    "# TYPE unicuro_domain_events_pending gauge",
    `unicuro_domain_events_pending ${pending}`,
    "# TYPE unicuro_domain_events_failed gauge",
    `unicuro_domain_events_failed ${failed}`,
    "# TYPE unicuro_operation_traces_total counter",
    `unicuro_operation_traces_total ${traces}`,
    "# TYPE unicuro_worker_failures_total counter",
    `unicuro_worker_failures_total ${workers}`,
  ].join("\n") + "\n";
  return new Response(body, { headers: { "content-type": "text/plain; version=0.0.4" } });
}
