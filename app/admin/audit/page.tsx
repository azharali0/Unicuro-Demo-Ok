import { requireRole } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export default async function Page() {
  await requireRole(["ADMIN", "SUPER_ADMIN"]);
  const logs = await prisma.apiRequestAudit.findMany({ orderBy: { createdAt: "desc" }, take: 200 });

  return (
    <main className="min-h-screen bg-white p-4 md:p-6">
      <section className="mx-auto max-w-7xl">
        <h1 className="text-3xl md:text-5xl font-black mb-6">API Audit Logs</h1>
        <div className="mt-6 grid gap-3">
          {logs.map((l) => (
            <article key={l.id} className="rounded-2xl border bg-white p-4 overflow-hidden shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <b className="text-sm md:text-base break-words text-slate-900">
                    <span className="text-slate-500 mr-2">{l.method}</span>
                    {l.endpoint}
                  </b>
                </div>
                <div className="flex-shrink-0">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${l.status.includes("ERROR") || l.status.includes("VIOLATION") ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'}`}>
                    {l.status}
                  </span>
                </div>
              </div>
              <div className="mt-2 text-xs text-slate-400">
                {new Date(l.createdAt).toLocaleString()}
              </div>
            </article>
          ))}
          {logs.length === 0 && (
            <p className="text-slate-500 italic p-4">No audit logs found.</p>
          )}
        </div>
      </section>
    </main>
  );
}
