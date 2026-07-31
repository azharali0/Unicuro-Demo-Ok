"use client";
import { useEffect, useState } from "react";

export function DynamicPricingCard() {
  const [countryCode, setCountryCode] = useState("GB");
  const [languageCode, setLanguageCode] = useState("en");
  const [period, setPeriod] = useState<"monthly" | "quarterly" | "yearly">("monthly");
  const [promoCode, setPromoCode] = useState("");
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/pricing/current?countryCode=${countryCode}&languageCode=${languageCode}&promoCode=${promoCode}`)
      .then((res) => res.json())
      .then(setData);
  }, [countryCode, languageCode, promoCode]);

  async function checkout() {
    const res = await fetch("/api/billing/dynamic-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ countryCode, languageCode, billingPeriod: period, promoCode: promoCode || undefined }),
    });
    const json = await res.json();
    if (json.url) window.location.href = json.url;
  }

  const pricing = data?.pricing;

  return (
    <section className="rounded-[24px] border bg-white p-8 shadow-sm bg-white text-slate-950">
      <p className="text-sm font-black uppercase text-indigo-600">Dynamic Global Pricing</p>
      <h2 className="mt-2 text-3xl font-black">UniCuro Premium</h2>
      <p className="mt-3 text-slate-600 text-slate-600">Base price is USD. Students see the equivalent in their local currency.</p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <select className="rounded-2xl border p-3 bg-white" value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
          <option value="US">United States</option><option value="GB">United Kingdom</option><option value="CA">Canada</option><option value="AU">Australia</option><option value="IN">India</option><option value="NG">Nigeria</option><option value="ZA">South Africa</option><option value="EU">European Union</option>
        </select>
        <select className="rounded-2xl border p-3 bg-white" value={languageCode} onChange={(e) => setLanguageCode(e.target.value)}>
          {(pricing?.language.available || [{code:"en", label:"English"}]).map((lang: any) => <option key={lang.code} value={lang.code}>{lang.nativeName || lang.label}</option>)}
        </select>
        <input className="rounded-2xl border p-3 bg-white" value={promoCode} onChange={(e) => setPromoCode(e.target.value.toUpperCase())} placeholder="FOUNDING50" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {(["monthly","quarterly","yearly"] as const).map((item) => (
          <button key={item} onClick={() => setPeriod(item)} className={`rounded-3xl border p-5 text-left ${period === item ? "border-indigo-500 bg-indigo-50" : "bg-white bg-white"}`}>
            <b className="capitalize">{item}</b>
            <p className="mt-2 text-3xl font-black">{pricing?.prices[item].display || "Loading..."}</p>
          </button>
        ))}
      </div>
      <button onClick={checkout} className="mt-6 w-full rounded-2xl bg-indigo-600 px-5 py-4 font-black text-white">Continue with {period} plan</button>
    </section>
  );
}
