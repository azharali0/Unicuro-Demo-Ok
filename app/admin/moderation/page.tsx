import { requireRole } from "@/lib/session";

export default async function ModerationPage() {
  await requireRole(["ADMIN", "SUPER_ADMIN"]);
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,.05)] md:p-8">
      <h1 className="text-3xl font-black">Content Moderation</h1>
      <p className="mt-4 text-slate-600">The content moderation suite is currently under construction. Please check back in a later sprint.</p>
    </div>
  );
}
