import { requireRole } from "@/lib/session";
import { AdminShell } from "@/components/admin/AdminShell";
export default async function AdminLayout({children}:{children:React.ReactNode}){const session=await requireRole(["ADMIN"]);return <AdminShell email={session.email}>{children}</AdminShell>}
