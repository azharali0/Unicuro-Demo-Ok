import { requireRole } from "@/lib/session";

export default async function SupportPage() {
  await requireRole(["ADMIN", "SUPER_ADMIN"]);
  return (
    <div className="rounded-3xl border bg-white p-8">
      <h1 className="text-3xl font-black">Support Center</h1>
      <p className="mt-4 text-slate-600">The support management center is currently under construction. Please check back in a later sprint.</p>
    </div>
  );
}
