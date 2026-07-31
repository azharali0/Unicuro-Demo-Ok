import { requireRole } from "@/lib/session";

export default async function AnalyticsPage() {
  await requireRole(["ADMIN", "SUPER_ADMIN"]);
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,.05)] md:p-8">
      <h1 className="text-3xl font-black">Analytics & Metrics</h1>
      <p className="mt-4 text-slate-600">The global analytics dashboard is currently under construction. Please check back in a later sprint.</p>
    </div>
  );
}
