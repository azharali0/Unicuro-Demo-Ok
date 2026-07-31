import { requireRole } from "@/lib/session";
import { RuntimeOnboardingShell } from "@/components/onboarding/RuntimeOnboardingShell";
import { RuntimeOnboardingForm } from "@/components/onboarding/RuntimeOnboardingForm";
import { getOnboardingState, listOnboardingOptions } from "@/lib/onboardingRuntimeEngine";


export default async function Page() {
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  const state = await getOnboardingState(user.id);
  const fields = [
      { name: "countryCode", label: "Primary Country", type: "select", required: true, defaultValue: state.profile.countryCode, options: await listOnboardingOptions("countries") },
      { name: "timezone", label: "Timezone", type: "select", required: true, defaultValue: (state.profile as any).timezone || "Europe/London", options: await listOnboardingOptions("timezones") },
    ] as any;

  return (
    <RuntimeOnboardingShell userId={user.id}>
      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-8">
          <h2 className="text-4xl font-black">Location and language</h2>
          <p className="mt-4 leading-8 text-slate-600">Use database-managed country, language, currency, and timezone settings for localised pricing and content.</p>
        </div>
        <RuntimeOnboardingForm
          stepCode="location"
          submitLabel="Continue"
          fields={fields}
        />
      </section>
    </RuntimeOnboardingShell>
  );
}
