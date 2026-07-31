import { StudentSidebar } from "@/components/student/StudentSidebar";
import { StudentHeader } from "@/components/student/StudentHeader";
export function StudentShell({children,email,role}:{children:React.ReactNode;email:string;role:string}){
 return <main className="student-role-root min-h-screen bg-white text-slate-950"><div className="mx-auto grid w-full max-w-[1540px] gap-5 px-4 py-4 sm:px-6 lg:grid-cols-[288px_minmax(0,1fr)] lg:px-8"><StudentSidebar/><section className="min-w-0"><StudentHeader email={email} role={role}/><div className="student-content mt-5 min-w-0">{children}</div></section></div></main>;
}
