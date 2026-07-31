"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  async function submit(formData: FormData) {
    setSaving(true);
    const payload = {
      title: String(formData.get("title") || ""),
      courseName: String(formData.get("courseName") || ""),
      assignmentType: String(formData.get("assignmentType") || ""),
      briefText: String(formData.get("briefText") || ""),
      deadlineAt: String(formData.get("deadlineAt") || "") || undefined,
      wordTarget: Number(formData.get("wordTarget") || 0) || undefined,
    };
    const res = await fetch("/api/student/coursework", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const json = await res.json();
    setSaving(false);
    if (json.ok) router.push("/student/coursework");
  }
  return (
    <main className="min-h-screen bg-white p-6 bg-white">
      <form action={submit} className="mx-auto max-w-3xl rounded-3xl border bg-white p-8 bg-white text-slate-950">
        <h1 className="text-4xl font-black">Create coursework workspace</h1>
        <div className="mt-6 grid gap-4">
          <input name="title" required className="rounded-2xl border p-4 bg-white" />
          <input name="courseName" className="rounded-2xl border p-4 bg-white" />
          <input name="assignmentType" required className="rounded-2xl border p-4 bg-white" />
          <textarea name="briefText" required className="min-h-56 rounded-2xl border p-4 bg-white" />
          <input name="deadlineAt" type="datetime-local" className="rounded-2xl border p-4 bg-white" />
          <input name="wordTarget" type="number" className="rounded-2xl border p-4 bg-white" />
        </div>
        <button disabled={saving} className="mt-6 w-full rounded-2xl bg-indigo-600 px-5 py-4 font-black">{saving ? "Saving..." : "Create workspace"}</button>
      </form>
    </main>
  );
}
