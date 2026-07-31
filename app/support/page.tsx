import { requireRole } from "@/lib/session";
import { listTickets } from "@/lib/supportEngine";
export default async function Page(){ const u=await requireRole(["STUDENT","MERCHANT","ADMIN","SUPER_ADMIN"]); const tickets=await listTickets(u.id); return <main className="min-h-screen bg-white p-6"><section className="mx-auto max-w-5xl"><h1 className="text-5xl font-black">Help & Support</h1><div className="mt-6 grid gap-3">{tickets.map(t=><article key={t.id} className="rounded-2xl border bg-white p-4"><b>{t.subject}</b><p>{t.status}</p></article>)}</div></section></main>}
