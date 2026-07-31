import type { SVGProps } from "react";

export type AppIconName =
  | "home" | "academic" | "coursework" | "spark" | "career" | "opportunity"
  | "scholarship" | "marketplace" | "life" | "wallet" | "budget" | "globe"
  | "community" | "discount" | "earn" | "saved" | "planner" | "wellbeing"
  | "settings" | "users" | "support" | "bell" | "shield" | "finance"
  | "chart" | "flag" | "jobs" | "search" | "arrow" | "check" | "book"
  | "calendar" | "clock" | "menu" | "logout" | "plus";

const paths: Record<AppIconName, React.ReactNode> = {
  home: <><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5"/><path d="M9.5 20v-6h5v6"/></>,
  academic: <><path d="m3 9 9-5 9 5-9 5-9-5Z"/><path d="M7 12.5V17c3 2 7 2 10 0v-4.5"/></>,
  coursework: <><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/></>,
  spark: <><path d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z"/><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"/></>,
  career: <><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5h8v2M3 12h18M10 12v2h4v-2"/></>,
  opportunity: <><path d="M12 3a7 7 0 0 0-4 12.7V19h8v-3.3A7 7 0 0 0 12 3Z"/><path d="M9 22h6M9 19h6"/></>,
  scholarship: <><path d="m4 8 8-4 8 4-8 4-8-4Z"/><path d="M7 11v5c3 2 7 2 10 0v-5"/><path d="M20 8v6"/></>,
  marketplace: <><path d="M4 9h16l-1 12H5L4 9Z"/><path d="m6 9 1-5h10l1 5M9 13v4M15 13v4"/></>,
  life: <><path d="M12 21s-7-4.5-7-11a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 6.5-7 11-7 11Z"/></>,
  wallet: <><path d="M4 6h15v14H4a2 2 0 0 1-2-2V6a3 3 0 0 1 3-3h12"/><path d="M15 10h6v6h-6a3 3 0 0 1 0-6Z"/></>,
  budget: <><circle cx="12" cy="12" r="9"/><path d="M12 7v10M15 9.5c-.8-1-5-1.2-5 1 0 2.6 5 1.3 5 4 0 2.2-4.2 2-5 1"/></>,
  globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></>,
  community: <><circle cx="8" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2.5 20c.5-4 2.5-6 5.5-6s5 2 5.5 6M13 20c.3-3 1.8-4.5 4-4.5 2.5 0 4 1.5 4.5 4.5"/></>,
  discount: <><path d="m4 12 8-8h7v7l-8 8-7-7Z"/><circle cx="15.5" cy="7.5" r="1"/><path d="m8 16 8-8"/></>,
  earn: <><circle cx="12" cy="12" r="9"/><path d="M12 7v10M15 9.5c-.8-1-5-1.2-5 1 0 2.6 5 1.3 5 4 0 2.2-4.2 2-5 1"/></>,
  saved: <path d="M6 3h12v18l-6-4-6 4V3Z"/>,
  planner: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18M8 14h3M8 17h6"/></>,
  wellbeing: <><path d="M12 21s-7-4.5-7-11a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 6.5-7 11-7 11Z"/><path d="M8 12h2l1-3 2 6 1-3h2"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21h-4v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H3v-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1L7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V3h4v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.1v4H21a1.7 1.7 0 0 0-1.6 1Z"/></>,
  users: <><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2"/><path d="M3 20c.5-4 2.5-6 6-6s5.5 2 6 6M14 20c.3-2.8 1.7-4.2 4-4.2 2 0 3.4 1.4 4 4.2"/></>,
  support: <><circle cx="12" cy="12" r="9"/><path d="M8.5 10a3.5 3.5 0 1 1 6 2.4c-1.5 1.3-2.5 1.8-2.5 3.6M12 19h.01"/></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></>,
  shield: <><path d="M12 3 4 6v6c0 5 3.3 8 8 9 4.7-1 8-4 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-5"/></>,
  finance: <><rect x="3" y="5" width="18" height="15" rx="2"/><path d="M3 10h18M8 15h3"/></>,
  chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></>,
  flag: <><path d="M5 21V4M5 5h11l-2 4 2 4H5"/></>,
  jobs: <><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 5V3h8v2M4 11h16"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6"/>,
  check: <path d="m5 12 4 4L19 6"/>,
  book: <><path d="M4 5h6a3 3 0 0 1 3 3v12a3 3 0 0 0-3-3H4V5ZM20 5h-6a3 3 0 0 0-3 3v12a3 3 0 0 1 3-3h6V5Z"/></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
  logout: <><path d="M10 17l5-5-5-5M15 12H3"/><path d="M14 4h6v16h-6"/></>,
  plus: <path d="M12 5v14M5 12h14"/>,
};

export function AppIcon({ name, ...props }: { name: AppIconName } & SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}
