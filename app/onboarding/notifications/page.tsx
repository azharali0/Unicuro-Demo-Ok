import { requireRole } from "@/lib/session";
import { RuntimeOnboardingShell } from "@/components/onboarding/RuntimeOnboardingShell";
import { RuntimeOnboardingForm } from "@/components/onboarding/RuntimeOnboardingForm";
import { getOnboardingState, listOnboardingOptions } from "@/lib/onboardingRuntimeEngine";


export default async function Page() {
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  const state = await getOnboardingState(user.id);
  const fields = [
      { name: "marketingConsent", label: "Receive marketing and offers", type: "checkbox", defaultValue: (state.profile as any).marketingConsent },
      { name: "systemNotifications", label: "Receive system and security alerts", type: "checkbox", defaultValue: (state.profile as any).systemNotifications },
    ] as any;

  return (
    <RuntimeOnboardingShell userId={user.id}>
      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-8">
          <h2 className="text-4xl font-black">Notification preferences</h2>
          <p className="mt-4 leading-8 text-slate-600">Choose the channels UniCuro may use for academic, billing, marketplace, security, and wellbeing updates.</p>
        </div>
        <RuntimeOnboardingForm
          stepCode="notifications"
          submitLabel="Continue"
          fields={fields}
        />
      </section>
    </RuntimeOnboardingShell>
  );
}
