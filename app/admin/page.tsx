import { requireRole } from "@/lib/session";
import Link from "next/link";

export default async function AdminDashboard() {
  await requireRole(["ADMIN"]);

  const modules = [
    { title: "Users Management", desc: "View, edit, and manage all users across the platform.", href: "/admin/users", color: "bg-blue-500" },
    { title: "Audit Logs", desc: "System-wide security, login, and action audit logs.", href: "/admin/audit", color: "bg-purple-500" },
    { title: "Dynamic Pricing", desc: "Manage Stripe plans, localization, and currency rates.", href: "/admin/pricing", color: "bg-indigo-600" },
    { title: "System Monitoring", desc: "View API events, latencies, and system health.", href: "/admin/monitoring", color: "bg-orange-500" },
    { title: "Content Management", desc: "Manage SEO landing pages, articles, and deals.", href: "/admin/content", color: "bg-pink-500" },
    { title: "Feature Flags", desc: "Enable or disable experimental features globally.", href: "/admin/feature-flags", color: "bg-indigo-500" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900">Admin Dashboard</h1>
        <p className="mt-2 text-slate-500">Welcome to the UniCuro Operations Center.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((mod) => (
          <Link key={mod.href} href={mod.href} className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,.05)] shadow-sm transition-all hover:shadow-md hover:border-slate-300">
            <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${mod.color} text-white`}>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-bold text-slate-900">{mod.title}</h3>
            <p className="text-sm text-slate-500">{mod.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
