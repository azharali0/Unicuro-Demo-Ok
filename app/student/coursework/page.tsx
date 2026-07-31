import { requireRole } from "@/lib/session";
import { listCoursework } from "@/lib/courseworkStudioEngine";
import Link from "next/link";

export default async function Page() {
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  const coursework = await listCoursework(user.id);
  return (
    <main className="min-h-screen bg-white p-6 bg-white">
      <section className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          <div><p className="font-black uppercase text-indigo-600">Academic Integrity First</p><h1 className="text-4xl font-black text-slate-950">Coursework & Assignment Studio</h1></div>
          <Link href="/student/coursework/new" className="rounded-2xl bg-indigo-600 px-5 py-3 font-black">New coursework</Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {coursework.map((item) => (
            <article key={item.id} className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,.05)] bg-white text-slate-950">
              <p className="text-sm font-black text-indigo-600">{item.assignmentType}</p>
              <h2 className="mt-2 text-2xl font-black">{item.title}</h2>
              <p className="mt-3 text-slate-600 text-slate-600">{item.courseName || "General coursework"}</p>
              <Link href={`/student/coursework/${item.id}`} className="mt-5 inline-flex font-black text-indigo-600">Open workspace</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
