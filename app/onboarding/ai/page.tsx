import { requireRole } from "@/lib/session";
import { RuntimeOnboardingShell } from "@/components/onboarding/RuntimeOnboardingShell";
import { RuntimeOnboardingForm } from "@/components/onboarding/RuntimeOnboardingForm";
import { getOnboardingState, listOnboardingOptions } from "@/lib/onboardingRuntimeEngine";


export default async function Page() {
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  const state = await getOnboardingState(user.id);
  const fields = [
      { name: "aiStudyEnabled", label: "Enable AI Study Assistant", type: "checkbox", defaultValue: (state.profile as any).aiStudyEnabled },
      { name: "preferredAiModel", label: "Preferred AI Model", type: "select", required: true, defaultValue: (state.profile as any).preferredAiModel, options: [
        { value: "gpt-4o-mini", label: "Fast (Default)" },
        { value: "gpt-4o", label: "Advanced (Premium)" },
      ]},
    ] as any;

  return (
    <RuntimeOnboardingShell userId={user.id}>
      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-8">
          <h2 className="text-4xl font-black">AI study support</h2>
          <p className="mt-4 leading-8 text-slate-600">Choose how strongly Twin AI and the Academic Assistant should support your study routines.</p>
        </div>
        <RuntimeOnboardingForm
          stepCode="ai"
          submitLabel="Continue"
          fields={fields}
        />
      </section>
    </RuntimeOnboardingShell>
  );
}
