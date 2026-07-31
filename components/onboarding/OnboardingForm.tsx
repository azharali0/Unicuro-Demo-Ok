"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function OnboardingForm({ code, next, fields, submitLabel = "Continue" }: { code: string; next: string; submitLabel?: string; fields: any[] }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  async function submit(formData: FormData) {
    setSaving(true); setError("");
    const data: Record<string, any> = {};
    fields.forEach((f) => { data[f.name] = f.type === "checkbox" ? formData.get(f.name) === "on" : String(formData.get(f.name) || ""); });
    const res = await fetch("/api/onboarding/step", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code, data }) });
    const json = await res.json(); setSaving(false);
    if (!json.ok) return setError(json.error || "Could not save onboarding step.");
    router.push(next);
  }
  return (
    <form action={submit} className="rounded-[24px] border bg-white p-8 shadow-sm bg-white text-slate-950">
      <div className="grid gap-5">
        {fields.map((f) => (
          <label key={f.name} className="grid gap-2 font-bold">
            <span>{f.label}</span>
            {f.options ? <select name={f.name} required={f.required} className="rounded-2xl border p-4 bg-white"><option value="">Choose...</option>{f.options.map((o: any) => <option key={o.value} value={o.value}>{o.label}</option>)}</select> :
            f.type === "checkbox" ? <input name={f.name} type="checkbox" defaultChecked={Boolean(f.defaultValue)} className="h-6 w-6" /> :
            <input name={f.name} required={f.required} className="rounded-2xl border p-4 bg-white" />}
          </label>
        ))}
      </div>
      {error && <p className="mt-4 rounded-2xl bg-red-50 p-4 font-bold text-red-700">{error}</p>}
      <button disabled={saving} className="mt-6 w-full rounded-2xl bg-indigo-600 px-6 py-4 font-black text-white">{saving ? "Saving..." : submitLabel}</button>
    </form>
  );
}
