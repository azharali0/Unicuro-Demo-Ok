import { requireRole } from "@/lib/session";
import { listSavedItems } from "@/lib/savedItemsEngine";
export default async function Page(){ const u=await requireRole(["STUDENT","MERCHANT"]); const items=await listSavedItems(u.id); return <main className="min-h-screen bg-white p-6"><section className="mx-auto max-w-5xl"><h1 className="text-5xl font-black">Saved Items</h1><div className="mt-6 grid gap-3">{items.map(i=><a key={i.id} href={i.route} className="rounded-2xl border bg-white p-4"><b>{i.title}</b><p>{i.entityType}</p></a>)}</div></section></main>}
