import { requireRole } from "@/lib/session";
import { StudentShell } from "@/components/student/StudentShell";
export default async function StudentLayout({children}:{children:React.ReactNode}){const session=await requireRole(["STUDENT","MERCHANT"]);return <StudentShell email={session.email} role={session.role}>{children}</StudentShell>}
