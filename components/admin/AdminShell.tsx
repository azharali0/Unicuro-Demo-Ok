import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
export function AdminShell({children,email}:{children:React.ReactNode;email:string}){return <main className="admin-role-root min-h-screen bg-white text-slate-950"><div className="mx-auto grid w-full max-w-[1540px] gap-5 px-4 py-4 sm:px-6 lg:grid-cols-[284px_minmax(0,1fr)] lg:px-8"><AdminSidebar/><section className="min-w-0"><AdminHeader email={email}/><div className="admin-content mt-5 min-w-0">{children}</div></section></div></main>}
