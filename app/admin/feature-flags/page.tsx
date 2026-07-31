import { requireRole } from "@/lib/session";
import { listFeatureFlags } from "@/lib/featureFlagEngine";

export default async function Page() {
  await requireRole(["ADMIN", "SUPER_ADMIN"]);
  const flags = await listFeatureFlags();

  return (
    <main className="min-h-screen bg-white p-6">
      <section className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-4xl md:text-5xl font-black">Feature Flags</h1>
          <button className="mt-4 md:mt-0 rounded-full bg-indigo-600 px-6 py-3 font-bold text-white hover:bg-indigo-700 transition-colors">
            Create Flag
          </button>
        </div>

        {flags.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {flags.map((f: any) => (
              <article key={f.id} className="rounded-2xl border bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <b className="text-lg">{f.name}</b>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${f.enabled ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                    {f.enabled ? "Enabled" : "Disabled"}
                  </span>
                </div>
                <p className="text-sm text-slate-500">
                  {f.description || "No description provided for this feature flag."}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <h2 className="text-2xl font-bold text-slate-700 mb-2">No Feature Flags</h2>
            <p className="text-slate-500 mb-6 max-w-md mx-auto">
              There are currently no feature flags configured for this environment. Feature flags allow you to safely deploy code behind toggles.
            </p>
            <button className="rounded-xl bg-slate-100 px-6 py-3 font-bold text-slate-700 hover:bg-slate-200 transition-colors">
              Read Documentation
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
