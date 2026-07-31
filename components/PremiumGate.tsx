import { assertPremiumAccess } from "@/lib/billing";

export async function PremiumGate({ children }: { children: React.ReactNode }) {
  const access = await assertPremiumAccess();
  if (!access.allowed) {
    return (
      <section className="rounded-3xl border bg-white p-8 bg-white text-slate-950">
        <h2 className="text-2xl font-black">Premium required</h2>
        <p className="mt-3 text-slate-600 text-slate-600">Upgrade to access premium discounts, cashback boosts, AI study support and advanced career tools.</p>
        <form action="/api/billing/checkout" method="post"><button className="mt-6 rounded-2xl bg-indigo-600 px-5 py-4 font-black text-white">Upgrade to Premium</button></form>
      </section>
    );
  }
  return <>{children}</>;
}
