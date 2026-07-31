import { requireRole } from "@/lib/session";
import { listJobs } from "@/lib/backgroundJobEngine";
export default async function Page(){ await requireRole(["ADMIN","SUPER_ADMIN"]); const jobs=await listJobs(); return <main className="min-h-screen bg-white p-6"><section className="mx-auto max-w-7xl"><h1 className="text-5xl font-black">Background Jobs</h1><div className="mt-6 grid gap-3">{jobs.map(j=><article key={j.id} className="rounded-2xl border bg-white p-4"><b>{j.queue} · {j.jobType}</b><p>{j.status}</p></article>)}</div></section></main>}
