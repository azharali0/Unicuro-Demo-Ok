import { PremiumGate } from "@/components/PremiumGate";

export default function AcademicPage() {
  return (
    <PremiumGate>
      <section className="rounded-[24px] border bg-white p-8 bg-white text-slate-950">
        <h1 className="text-3xl font-black">AI Academic Assistant</h1>
        <p className="mt-3 text-slate-600 text-slate-600">Ask study questions, create revision plans and generate flashcards with quota protection.</p>
        <textarea className="mt-6 min-h-40 w-full rounded-2xl border p-4 bg-white" placeholder="Ask a study question..." />
        <button className="mt-4 rounded-2xl bg-indigo-600 px-5 py-4 font-black text-white">Ask Assistant</button>
      </section>
    </PremiumGate>
  );
}
