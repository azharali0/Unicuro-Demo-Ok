import { requireRole } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { listOpportunities } from "@/lib/studentEnginesDb";
export default async function EarnPage() {
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  const pref = await prisma.localisationPreference.findUnique({ where: { userId: user.id } });
  const rows = await listOpportunities(pref?.countryCode || undefined);
  return <main className="min-h-screen bg-white p-6 bg-white"><section className="mx-auto max-w-7xl"><p className="font-black uppercase text-indigo-600">Earn while studying</p><h1 className="text-5xl font-black text-slate-950">Jobs, Gigs & Opportunities</h1><div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{rows.map(item=><article key={item.id} className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,.05)] bg-white text-slate-950"><p className="text-sm font-black text-indigo-600">{item.type}</p><h2 className="mt-2 text-2xl font-black">{item.title}</h2><p className="mt-2 font-bold">{item.provider}</p><p className="mt-3 text-slate-600 text-slate-600">{item.description}</p><div className="mt-5 flex justify-between"><span>{item.payLabel || (item.remote ? "Remote" : item.location || "Location flexible")}</span>{item.applicationUrl&&<a href={item.applicationUrl} className="font-black text-indigo-600">Apply</a>}</div></article>)}{rows.length===0&&<article className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,.05)]"><h2 className="text-2xl font-black">No active opportunities for your region</h2></article>}</div></section></main>;
}
