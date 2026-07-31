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
          <h2 className="text-4xl font-black">Welcome to UniCuro</h2>
          <p className="mt-4 leading-8 text-slate-600">Start your setup. Every choice is saved to your account and used to configure the platform around you.</p>
        </div>
        <RuntimeOnboardingForm
          stepCode="welcome"
          submitLabel="Start setup"
          fields={fields}
        />
      </section>
    </RuntimeOnboardingShell>
  );
}
