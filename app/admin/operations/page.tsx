import { requireRole } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export default async function OperationsPage() {
  await requireRole(["ADMIN", "SUPER_ADMIN"]);
  const [events, traces, executions] = await Promise.all([
    prisma.domainEvent.findMany({ orderBy: { occurredAt: "desc" }, take: 50 }),
    prisma.operationTrace.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
    prisma.workerExecution.findMany({ orderBy: { startedAt: "desc" }, take: 50 }),
  ]);

  return (
    <main className="grid gap-6">
      <section className="ui-card">
        <p className="ui-eyebrow">Operational paths</p>
        <h1 className="ui-title">Events, traces and workers</h1>
        <p className="ui-copy mt-3">
          Follow each request from validated API through transaction, queue, worker and observable result.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <article className="ui-card">
          <h2 className="text-lg font-black">Domain events</h2>
          <p className="mt-2 text-3xl font-black">{events.length}</p>
        </article>
        <article className="ui-card">
          <h2 className="text-lg font-black">Operation traces</h2>
          <p className="mt-2 text-3xl font-black">{traces.length}</p>
        </article>
        <article className="ui-card">
          <h2 className="text-lg font-black">Worker executions</h2>
          <p className="mt-2 text-3xl font-black">{executions.length}</p>
        </article>
      </section>

      <section className="ui-card overflow-x-auto">
        <h2 className="text-xl font-black">Latest events</h2>
        <table className="mt-4 w-full text-left text-sm">
          <thead><tr><th>Type</th><th>Status</th><th>Aggregate</th><th>Occurred</th></tr></thead>
          <tbody>{events.map((event) => <tr key={event.id}><td>{event.eventType}</td><td>{event.status}</td><td>{event.aggregateType}</td><td>{event.occurredAt.toISOString()}</td></tr>)}</tbody>
        </table>
      </section>
    </main>
  );
}
