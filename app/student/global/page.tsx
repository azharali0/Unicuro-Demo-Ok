import { listCountryProfiles } from "@/lib/globalStudentIntelligenceEngine";

export default async function Page() {
  const countries = await listCountryProfiles();
  return (
    <main className="min-h-screen bg-white p-6 bg-white">
      <section className="mx-auto max-w-7xl">
        <p className="font-black uppercase text-indigo-600">Global Student Intelligence</p>
        <h1 className="text-5xl font-black text-slate-950">Country-aware university support</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {countries.map((c) => <article key={c.id} className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,.05)] bg-white text-slate-950"><h2 className="text-2xl font-black">{c.countryName}</h2><p className="mt-2">{c.currencyCode} · {c.languageCodes.join(", ")}</p></article>)}
        </div>
      </section>
    </main>
  );
}
