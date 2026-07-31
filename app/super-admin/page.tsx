import Link from "next/link";
import { AppIcon } from "@/components/ui/AppIcon";

export default function SuperAdminDashboard() {
  return (
    <main className="grid gap-6">
      <section className="ui-card">
        <p className="ui-eyebrow">Platform Control</p>
        <h1 className="ui-title">Super Admin Dashboard</h1>
        <p className="ui-copy mt-3">
          Welcome to the UniSphere Super Administrator portal. 
          Use the sidebar to navigate through platform governance, infrastructure, and financial controls.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="ui-card">
          <span className="ui-icon-tile mb-4"><AppIcon name="shield" className="h-5 w-5"/></span>
          <h2 className="text-lg font-black">System Access</h2>
          <p className="mt-2 text-sm text-slate-500">You are logged in with maximum platform privileges.</p>
        </article>
        <Link href="/super-admin/pricing" className="ui-card group transition hover:border-indigo-200">
          <span className="ui-icon-tile mb-4"><AppIcon name="wallet" className="h-5 w-5"/></span>
          <h2 className="text-lg font-black group-hover:text-indigo-600 transition-colors">Manage Pricing</h2>
          <p className="mt-2 text-sm text-slate-500">Configure subscription tiers and regional multipliers.</p>
        </Link>
      </section>
    </main>
  );
}
