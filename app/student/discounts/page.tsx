import { requireRole } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { listDeals } from "@/lib/studentEnginesDb";
export default async function DiscountsPage() {
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  const pref = await prisma.localisationPreference.findUnique({ where: { userId: user.id } });
  const deals = await listDeals(pref?.countryCode || undefined, true);
  return <main className="min-h-screen bg-white p-6 bg-white"><section className="mx-auto max-w-7xl"><p className="font-black uppercase text-indigo-600">Save more</p><h1 className="text-5xl font-black text-slate-950">Student Discounts</h1><div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{deals.map(deal=><article key={deal.id} className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,.05)] bg-white text-slate-950"><p className="text-sm font-black text-indigo-600">{deal.category}</p><h2 className="mt-2 text-2xl font-black">{deal.title}</h2><p className="mt-2 font-bold">{deal.merchantName}</p><p className="mt-3 text-slate-600 text-slate-600">{deal.description}</p><div className="mt-5 flex justify-between"><span className="font-black">{deal.discountLabel}</span>{deal.redemptionUrl&&<a href={deal.redemptionUrl} className="font-black text-indigo-600">View deal</a>}</div></article>)}{deals.length===0&&<article className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,.05)]"><h2 className="text-2xl font-black">No active deals for your region</h2></article>}</div></section></main>;
}
