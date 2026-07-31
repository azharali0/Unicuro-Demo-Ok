import { requireRole } from "@/lib/session";
import { RuntimeOnboardingShell } from "@/components/onboarding/RuntimeOnboardingShell";
import { RuntimeOnboardingForm } from "@/components/onboarding/RuntimeOnboardingForm";
import { getOnboardingState, listOnboardingOptions } from "@/lib/onboardingRuntimeEngine";


export default async function Page() {
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  const state = await getOnboardingState(user.id);
  const fields = [
      { name: "merchantInterested", label: "Enable merchant tools", type: "checkbox", defaultValue: state.profile.merchantInterested },
    ] as any;

  return (
    <RuntimeOnboardingShell userId={user.id}>
      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-8">
          <h2 className="text-4xl font-black">Merchant access</h2>
          <p className="mt-4 leading-8 text-slate-600">Selling is optional. Turn it on only if you want merchant tools available from your dashboard.</p>
        </div>
        <RuntimeOnboardingForm
          stepCode="merchant"
          submitLabel="Continue"
          fields={fields}
        />
      </section>
    </RuntimeOnboardingShell>
  );
}
