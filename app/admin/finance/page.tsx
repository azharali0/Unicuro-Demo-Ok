import { requireRole } from "@/lib/session";

export default async function FinancePage() {
  await requireRole(["ADMIN", "SUPER_ADMIN"]);
  return (
    <div className="rounded-3xl border bg-white p-8">
      <h1 className="text-3xl font-black">Finance Operations</h1>
      <p className="mt-4 text-slate-600">The finance and payouts dashboard is currently under construction. Please check back in a later sprint.</p>
    </div>
  );
}
