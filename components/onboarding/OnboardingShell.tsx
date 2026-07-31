import Link from "next/link";
import { getOnboardingState } from "@/lib/onboardingEngine";
export async function OnboardingShell({ userId, children }: { userId: string; children: React.ReactNode }) {
  const state = await getOnboardingState(userId);
  const steps = state.flow?.steps || [];
  return (
    <main className="min-h-screen bg-white p-6 bg-white">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-[24px] border bg-white p-6 shadow-sm bg-white text-slate-950">
          <p className="text-sm font-black uppercase text-indigo-600">UniCuro Onboarding</p>
          <h1 className="mt-1 text-3xl font-black">Set up your student operating system</h1>
          <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-indigo-600" style={{ width: `${state.completionPercent}%` }} /></div>
          <nav className="mt-6 grid gap-2 md:grid-cols-5">{steps.map((s) => <Link key={s.id} href={s.route} className="rounded-2xl border bg-white px-3 py-2 text-sm font-bold bg-white">{s.sortOrder}. {s.title}</Link>)}</nav>
        </div>
        <div className="mt-6">{children}</div>
      </section>
    </main>
  );
}
