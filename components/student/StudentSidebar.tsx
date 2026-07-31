"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { AppIcon, type AppIconName } from "@/components/ui/AppIcon";

const groups: Array<[string, Array<[string,string,AppIconName]>]> = [
  ["Study", [["/student","Dashboard","home"],["/student/academic","Academic","academic"],["/student/coursework","Coursework","coursework"],["/student/twin","Twin AI","spark"],["/student/planner","Planner","planner"]]],
  ["Discover", [["/student/career","Career Centre","career"],["/student/opportunities","Opportunities","opportunity"],["/student/scholarships","Scholarships","scholarship"],["/student/marketplace","Marketplace","marketplace"],["/student/discounts","Discounts","discount"],["/student/earn","Earn","earn"]]],
  ["Personal", [["/student/life","Student Life","life"],["/student/wallet","Wallet","wallet"],["/student/budget","Budget Planner","budget"],["/student/global","Global Centre","globe"],["/student/community","Community","community"],["/student/saved","Saved Items","saved"],["/student/wellbeing","Wellbeing","wellbeing"],["/student/settings","Settings","settings"]]],
];

export function StudentSidebar(){
  const pathname=usePathname();
  return <aside className="student-sidebar lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)]"><nav className="flex h-full gap-2 overflow-x-auto rounded-[26px] border border-indigo-100 bg-white p-3 shadow-[0_16px_48px_rgba(79,70,229,.08)] lg:flex-col lg:overflow-y-auto">
    <div className="hidden border-b border-indigo-50 px-3 pb-5 pt-2 lg:block"><p className="text-xs font-black uppercase tracking-[.18em] text-indigo-600">Student workspace</p><h2 className="mt-2 text-xl font-black">Your university day</h2><p className="mt-1 text-xs leading-5 text-slate-500">Study, money, wellbeing and opportunity tools.</p></div>
    <div className="flex gap-2 lg:grid">{groups.map(([title,items])=><div key={title} className="grid gap-1"><p className="px-3 pb-1 pt-3 text-[10px] font-black uppercase tracking-[.18em] text-slate-400">{title}</p>{items.map(([href,label,icon])=>{const active=pathname===href||(href!=="/student"&&pathname.startsWith(href));return <Link key={href} href={href} className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition ${active?"bg-indigo-600 text-white":"text-slate-600 hover:bg-indigo-50 hover:text-indigo-800"}`}><span className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border ${active?"border-white/20 bg-white/10":"border-slate-200 bg-white text-slate-500"}`}><AppIcon name={icon} className="h-4 w-4"/></span>{label}</Link>})}</div>)}</div>
    <div className="ml-auto shrink-0 lg:mt-auto lg:ml-0"><LogoutButton/></div>
  </nav></aside>;
}
