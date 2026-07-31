import { prisma } from "@/lib/prisma";

export type FxProviderResponse = {
  base: string;
  rates: Record<string, number>;
  provider: string;
};

export const supportedFxCurrencies = ["USD", "GBP", "CAD", "AUD", "INR", "NGN", "ZAR", "EUR"];

export async function fetchLiveFxRates(): Promise<FxProviderResponse> {
  const endpoint = process.env.FX_RATE_API_URL;
  const apiKey = process.env.FX_RATE_API_KEY;

  if (endpoint) {
    const url = endpoint.includes("?") ? `${endpoint}&base=USD` : `${endpoint}?base=USD`;
    const response = await fetch(url, { headers: apiKey ? { Authorization: `Bearer ${apiKey}` } : {} });
    if (!response.ok) throw new Error(`FX_PROVIDER_FAILED_${response.status}`);
    const data = await response.json();
    return {
      base: data.base || data.base_code || "USD",
      rates: data.rates || data.conversion_rates || {},
      provider: process.env.FX_RATE_PROVIDER || "configured-provider",
    };
  }

  return {
    base: "USD",
    provider: "seeded-fallback",
    rates: { USD: 1, GBP: 0.79, CAD: 1.36, AUD: 1.51, INR: 83, NGN: 1500, ZAR: 18.3, EUR: 0.92 },
  };
}

export async function updateFxRatesAndPricingRules() {
  const live = await fetchLiveFxRates();
  const regions = await prisma.pricingRegion.findMany({ where: { active: true } });
  const plans = await prisma.pricingPlan.findMany({ where: { active: true } });

  const updates = [];

  for (const region of regions) {
    const rate = live.rates[region.currencyCode];
    if (!rate) continue;

    await prisma.pricingRegion.update({
      where: { countryCode: region.countryCode },
      data: { exchangeRateFromUsd: rate },
    });

    await prisma.fxRateSnapshot.create({
      data: {
        baseCurrency: "USD",
        targetCurrency: region.currencyCode,
        rate,
        provider: live.provider,
      },
    });

    for (const plan of plans) {
      const rule = await prisma.pricingRule.findUnique({
        where: { pricingPlanId_pricingRegionId: { pricingPlanId: plan.id, pricingRegionId: region.id } },
      });
      const monthly = round99(plan.monthlyUsdCents * rate);
      const quarterly = round99(plan.quarterlyUsdCents * rate);
      const yearly = round99(plan.yearlyUsdCents * rate);

      if (rule) {
        await prisma.pricingRule.update({
          where: { id: rule.id },
          data: { localMonthlyCents: monthly, localQuarterlyCents: quarterly, localYearlyCents: yearly },
        });
      } else {
        await prisma.pricingRule.create({
          data: {
            pricingPlanId: plan.id,
            pricingRegionId: region.id,
            localMonthlyCents: monthly,
            localQuarterlyCents: quarterly,
            localYearlyCents: yearly,
          },
        });
      }
      updates.push({ countryCode: region.countryCode, currencyCode: region.currencyCode, rate });
    }
  }

  return { ok: true, provider: live.provider, updates };
}

function round99(cents: number) {
  if (cents < 100) return Math.max(99, Math.round(cents));
  return Math.floor(cents / 100) * 100 + 99;
}
