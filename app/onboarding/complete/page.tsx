import { requireRole } from "@/lib/session";
import { RuntimeOnboardingShell } from "@/components/onboarding/RuntimeOnboardingShell";
import { RuntimeOnboardingForm } from "@/components/onboarding/RuntimeOnboardingForm";
import { getOnboardingState, listOnboardingOptions } from "@/lib/onboardingRuntimeEngine";


export default async function Page() {
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  const state = await getOnboardingState(user.id);
  const fields: any[] = [];

  return (
    <RuntimeOnboardingShell userId={user.id}>
      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-8">
          <h2 className="text-4xl font-black">Finish setup</h2>
          <p className="mt-4 leading-8 text-slate-600">Confirm your onboarding. UniCuro will mark your account as ready and open your personalised dashboard.</p>
        </div>
        <RuntimeOnboardingForm
          stepCode="complete"
          submitLabel="Finish and open dashboard"
          fields={fields}
        />
      </section>
    </RuntimeOnboardingShell>
  );
}
