import { requireRole } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export default async function Page() {
  await requireRole(["ADMIN", "SUPER_ADMIN"]);
  const h = await prisma.homepageContent.findFirst({ include: { sections: true } });

  return (
    <main className="min-h-screen bg-white p-6">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-black mb-8">Homepage CMS</h1>
        
        {h ? (
          <div className="grid gap-6">
            <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,.05)] md:p-8">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Hero Section</h2>
              <div className="grid gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-500">Headline</p>
                  <p className="text-lg font-medium">{h.heroHeadline}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500">Subheadline</p>
                  <p className="text-lg">{h.heroSubheadline}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,.05)] md:p-8">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Feature Sections</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {h.sections.map((section: any) => (
                  <div key={section.id} className="rounded-2xl bg-white p-4 border border-slate-100">
                    <h3 className="font-bold text-lg">{section.title}</h3>
                    <p className="mt-2 text-slate-600">{section.content}</p>
                  </div>
                ))}
                {h.sections.length === 0 && (
                  <p className="text-slate-500 italic">No feature sections configured.</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border bg-white p-8 text-center">
            <p className="text-slate-500">No homepage content found in the database.</p>
          </div>
        )}
      </section>
    </main>
  );
}
