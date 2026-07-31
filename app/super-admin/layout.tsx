import { requireRole } from "@/lib/session";
import { SuperAdminShell } from "@/components/super-admin/SuperAdminShell";
export default async function SuperAdminLayout({children}:{children:React.ReactNode}){const session=await requireRole(["SUPER_ADMIN"]);return <SuperAdminShell email={session.email}>{children}</SuperAdminShell>}
