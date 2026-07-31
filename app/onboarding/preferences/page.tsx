import { requireRole } from "@/lib/session";
import { RuntimeOnboardingShell } from "@/components/onboarding/RuntimeOnboardingShell";
import { RuntimeOnboardingForm } from "@/components/onboarding/RuntimeOnboardingForm";
import { getOnboardingState, listOnboardingOptions } from "@/lib/onboardingRuntimeEngine";


export default async function Page() {
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  const state = await getOnboardingState(user.id);
  const fields = [
      { name: "marketplaceInterest", label: "Enable marketplace and student deals", type: "checkbox", defaultValue: state.profile.marketplaceInterest },
      { name: "merchantInterested", label: "Enable merchant setup and selling tools", type: "checkbox", defaultValue: state.profile.merchantInterested },
    ] as any;

  return (
    <RuntimeOnboardingShell userId={user.id}>
      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-8">
          <h2 className="text-4xl font-black">Choose your UniCuro experience</h2>
          <p className="mt-4 leading-8 text-slate-600">Decide which major student tools should be activated for your account.</p>
        </div>
        <RuntimeOnboardingForm
          stepCode="preferences"
          submitLabel="Continue"
          fields={fields}
        />
      </section>
    </RuntimeOnboardingShell>
  );
}
