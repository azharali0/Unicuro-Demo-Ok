"use client";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("unicuro-theme");
    const active = saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDark(active);
    document.documentElement.classList.toggle("dark", active);
  }, []);
  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("unicuro-theme", next ? "dark" : "light");
  }
  return <button onClick={toggle} className="rounded-xl border px-3 py-2 text-sm font-bold">{dark ? "Light" : "Dark"}</button>;
}
