import Link from "next/link";

export function ModuleCard({ title, body, href, label }: { title: string; body: string; href: string; label: string }) {
  return (
    <article className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,.05)] shadow-sm bg-white text-slate-950">
      <h2 className="text-2xl font-black">{title}</h2>
      <p className="mt-3 leading-7 text-slate-600 text-slate-600">{body}</p>
      <Link href={href} className="mt-5 inline-flex rounded-2xl bg-indigo-600 px-5 py-3 font-black text-white">{label}</Link>
    </article>
  );
}
