import { requireRole } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { workspaceId: string } }) {
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  const workspace = await prisma.courseworkWorkspace.findFirst({
    where: { id: params.workspaceId, userId: user.id },
    include: { outline: true, sources: true, milestones: { orderBy: { sortOrder: "asc" } }, feedback: true },
  });
  if (!workspace) notFound();

  return (
    <main className="min-h-screen bg-white p-6 bg-white">
      <section className="mx-auto max-w-6xl">
        <p className="font-black uppercase text-indigo-600">Academic Integrity Mode</p>
        <h1 className="text-5xl font-black text-slate-950">{workspace.title}</h1>
        <p className="mt-4 max-w-3xl leading-8 text-slate-600 text-slate-600">{workspace.briefText}</p>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <article className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,.05)] bg-white text-slate-950">
            <h2 className="text-2xl font-black">Structured outline</h2>
            <pre className="mt-4 whitespace-pre-wrap text-sm">{JSON.stringify(workspace.outline?.sections || [], null, 2)}</pre>
          </article>
          <article className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,.05)] bg-white text-slate-950">
            <h2 className="text-2xl font-black">Milestones</h2>
            <div className="mt-4 grid gap-3">
              {workspace.milestones.map((item) => <div key={item.id} className="rounded-2xl bg-white p-4 bg-white"><strong>{item.title}</strong><p>{item.status}</p></div>)}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
