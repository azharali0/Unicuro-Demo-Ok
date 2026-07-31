"use client";
import { useRouter } from "next/navigation";
import { AppIcon } from "@/components/ui/AppIcon";
export function LogoutButton(){const router=useRouter();async function logout(){await fetch("/api/auth/logout",{method:"POST"});router.push("/");router.refresh();}return <button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-500 transition hover:bg-red-50 hover:text-red-700"><span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white"><AppIcon name="logout" className="h-4 w-4"/></span>Sign out</button>}
