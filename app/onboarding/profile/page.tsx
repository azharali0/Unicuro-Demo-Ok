import { requireRole } from "@/lib/session";
import { RuntimeOnboardingShell } from "@/components/onboarding/RuntimeOnboardingShell";
import { RuntimeOnboardingForm } from "@/components/onboarding/RuntimeOnboardingForm";
import { getOnboardingState, listOnboardingOptions } from "@/lib/onboardingRuntimeEngine";


export default async function Page() {
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  const state = await getOnboardingState(user.id);
  const fields = [
      { name: "displayName", label: "Display name", type: "text", required: true, defaultValue: state.profile.displayName },
      { name: "studyGoal", label: "Primary study goal", type: "textarea", required: true, defaultValue: state.profile.studyGoal },
    ] as any;

  return (
    <RuntimeOnboardingShell userId={user.id}>
      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-8">
          <h2 className="text-4xl font-black">Build your profile</h2>
          <p className="mt-4 leading-8 text-slate-600">Tell UniCuro how you would like to be identified and what you want to achieve.</p>
        </div>
        <RuntimeOnboardingForm
          stepCode="profile"
          submitLabel="Continue"
          fields={fields}
        />
      </section>
    </RuntimeOnboardingShell>
  );
}
