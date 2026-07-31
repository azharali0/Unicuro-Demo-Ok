import { requireRole } from "@/lib/session";
import { getLatestHealth } from "@/lib/monitoringEngine";
export default async function Page(){ await requireRole(["ADMIN","SUPER_ADMIN"]); const checks=await getLatestHealth(); return <main className="min-h-screen bg-white p-6"><section className="mx-auto max-w-7xl"><h1 className="text-5xl font-black">Monitoring & Observability</h1><div className="mt-6 grid gap-3 md:grid-cols-3">{checks.map(c=><article key={c.id} className="rounded-2xl border bg-white p-4"><b>{c.service}</b><p>{c.status}</p></article>)}</div></section></main>}
