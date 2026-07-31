import { requireRole } from "@/lib/session";
import { RuntimeOnboardingShell } from "@/components/onboarding/RuntimeOnboardingShell";
import { RuntimeOnboardingForm } from "@/components/onboarding/RuntimeOnboardingForm";
import { getOnboardingState, listOnboardingOptions } from "@/lib/onboardingRuntimeEngine";


export default async function Page() {
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  const state = await getOnboardingState(user.id);
  const fields = [
      { name: "universityName", label: "University", type: "select", required: true, defaultValue: (state.profile as any).universityName, options: await listOnboardingOptions("universities") },
      { name: "course", label: "Course Name", type: "text", required: true, defaultValue: (state.profile as any).course },
      { name: "yearOfStudy", label: "Year of study", type: "select", required: true, defaultValue: state.profile.yearOfStudy, options: (await listOnboardingOptions("year_of_study")).map((o) => ({ value: o.value, label: o.label })) },
    ] as any;

  return (
    <RuntimeOnboardingShell userId={user.id}>
      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-8">
          <h2 className="text-4xl font-black">Academic setup</h2>
          <p className="mt-4 leading-8 text-slate-600">Connect your university, course, and year so UniCuro can personalise academic tools and opportunities.</p>
        </div>
        <RuntimeOnboardingForm
          stepCode="education"
          submitLabel="Continue"
          fields={fields}
        />
      </section>
    </RuntimeOnboardingShell>
  );
}
