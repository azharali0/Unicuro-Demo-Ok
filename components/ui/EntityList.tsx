import Link from "next/link";
export function EntityList({ title, items }: { title: string; items: Array<{ id: string; title: string; subtitle?: string; href?: string }> }) {
  return <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,.05)] bg-white text-slate-950"><h2 className="text-2xl font-black">{title}</h2><div className="mt-4 grid gap-3">{items.map(i => <div key={i.id} className="rounded-2xl bg-white p-4 bg-white"><div className="font-black">{i.title}</div>{i.subtitle && <p>{i.subtitle}</p>}{i.href && <Link href={i.href} className="font-black text-indigo-600">Open</Link>}</div>)}</div></section>
}
