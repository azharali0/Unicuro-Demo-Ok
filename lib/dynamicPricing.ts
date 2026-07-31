import { z } from "zod";

export const pricingRequestSchema = z.object({
  countryCode: z.string().min(2).max(3).optional(),
  languageCode: z.string().min(2).max(8).optional(),
  planCode: z.string().default("STUDENT_PREMIUM"),
  promoCode: z.string().optional(),
});

export const supportedLanguages = [
  { code: "en", label: "English", nativeName: "English" },
  { code: "fr", label: "French", nativeName: "Français" },
  { code: "hi", label: "Hindi", nativeName: "हिन्दी" },
  { code: "yo", label: "Yoruba", nativeName: "Yorùbá" },
  { code: "ig", label: "Igbo", nativeName: "Igbo" },
  { code: "ha", label: "Hausa", nativeName: "Hausa" },
  { code: "es", label: "Spanish", nativeName: "Español" },
  { code: "ar", label: "Arabic", nativeName: "العربية" },
];

export const fallbackRegions = [
  { countryCode: "US", countryName: "United States", currencyCode: "USD", currencySymbol: "$", exchangeRateFromUsd: 1, defaultLanguage: "en" },
  { countryCode: "GB", countryName: "United Kingdom", currencyCode: "GBP", currencySymbol: "£", exchangeRateFromUsd: 0.79, defaultLanguage: "en" },
  { countryCode: "CA", countryName: "Canada", currencyCode: "CAD", currencySymbol: "CA$", exchangeRateFromUsd: 1.36, defaultLanguage: "en" },
  { countryCode: "AU", countryName: "Australia", currencyCode: "AUD", currencySymbol: "AU$", exchangeRateFromUsd: 1.51, defaultLanguage: "en" },
  { countryCode: "IN", countryName: "India", currencyCode: "INR", currencySymbol: "₹", exchangeRateFromUsd: 83, defaultLanguage: "hi" },
  { countryCode: "NG", countryName: "Nigeria", currencyCode: "NGN", currencySymbol: "₦", exchangeRateFromUsd: 1500, defaultLanguage: "en" },
  { countryCode: "ZA", countryName: "South Africa", currencyCode: "ZAR", currencySymbol: "R", exchangeRateFromUsd: 18.3, defaultLanguage: "en" },
  { countryCode: "EU", countryName: "European Union", currencyCode: "EUR", currencySymbol: "€", exchangeRateFromUsd: 0.92, defaultLanguage: "en" },
];

export const fallbackPlan = {
  code: "STUDENT_PREMIUM",
  name: "UniCuro Premium",
  description: "Premium discounts, AI academic support, cashback boosts and career tools.",
  baseCurrency: "USD",
  monthlyUsdCents: 799,
  quarterlyUsdCents: 2099,
  yearlyUsdCents: 7499,
};

export function detectCountryFromHeaders(headers: Headers) {
  return (headers.get("x-vercel-ip-country") || headers.get("cf-ipcountry") || headers.get("x-country-code") || "US").toUpperCase();
}

export function roundLocalCents(cents: number) {
  if (cents < 100) return Math.max(99, Math.round(cents));
  return Math.floor(cents / 100) * 100 + 99;
}

export function formatMoney(cents: number, currencyCode: string, languageCode = "en") {
  return new Intl.NumberFormat(languageCode, { style: "currency", currency: currencyCode }).format(cents / 100);
}

export function applyPromo(cents: number, discountPercent?: number | null, discountAmountCents?: number | null) {
  if (discountPercent) return Math.max(0, Math.round(cents * (1 - discountPercent / 100)));
  if (discountAmountCents) return Math.max(0, cents - discountAmountCents);
  return cents;
}

export async function getDynamicPricing(input: { countryCode?: string; languageCode?: string; planCode?: string; promoCode?: string; prisma?: any }) {
  const countryCode = (input.countryCode || "US").toUpperCase();
  const languageCode = input.languageCode || "en";
  const planCode = input.planCode || "STUDENT_PREMIUM";
  let region: any = null, plan: any = null, rule: any = null, promo: any = null;

  if (input.prisma) {
    try {
      region = await input.prisma.pricingRegion.findFirst({ where: { countryCode, active: true } });
      plan = await input.prisma.pricingPlan.findFirst({ where: { code: planCode, active: true } });
      if (region && plan) rule = await input.prisma.pricingRule.findUnique({ where: { pricingPlanId_pricingRegionId: { pricingPlanId: plan.id, pricingRegionId: region.id } } });
      if (input.promoCode) promo = await input.prisma.promoCode.findFirst({ where: { code: input.promoCode.toUpperCase(), active: true, startsAt: { lte: new Date() }, expiresAt: { gte: new Date() } } });
    } catch {}
  }

  region = region || fallbackRegions.find((r) => r.countryCode === countryCode) || fallbackRegions[0];
  plan = plan || fallbackPlan;
  const rate = Number(region.exchangeRateFromUsd);

  const monthly = rule?.localMonthlyCents ?? roundLocalCents(plan.monthlyUsdCents * rate);
  const quarterly = rule?.localQuarterlyCents ?? roundLocalCents(plan.quarterlyUsdCents * rate);
  const yearly = rule?.localYearlyCents ?? roundLocalCents(plan.yearlyUsdCents * rate);
  const discountPercent = promo?.discountPercent || null;
  const discountAmountCents = promo?.discountAmountCents || null;

  function price(cents: number, usdCents: number, stripePriceId?: string) {
    const finalCents = applyPromo(cents, discountPercent, discountAmountCents);
    return {
      usdCents,
      localCents: finalCents,
      beforeDiscountLocalCents: cents,
      display: formatMoney(finalCents, region.currencyCode, languageCode),
      stripePriceId,
    };
  }

  return {
    plan: { code: plan.code, name: plan.name, description: plan.description, baseCurrency: "USD" },
    region: { countryCode: region.countryCode, countryName: region.countryName, currencyCode: region.currencyCode, currencySymbol: region.currencySymbol, defaultLanguage: region.defaultLanguage },
    language: { base: "en", selected: languageCode, available: supportedLanguages },
    promo: promo ? { code: promo.code, discountPercent: promo.discountPercent, discountAmountCents: promo.discountAmountCents } : null,
    prices: {
      monthly: price(monthly, plan.monthlyUsdCents, rule?.stripeMonthlyPriceId || process.env.STRIPE_PRICE_STUDENT_MONTHLY),
      quarterly: price(quarterly, plan.quarterlyUsdCents, rule?.stripeQuarterlyPriceId || process.env.STRIPE_PRICE_STUDENT_QUARTERLY),
      yearly: price(yearly, plan.yearlyUsdCents, rule?.stripeYearlyPriceId || process.env.STRIPE_PRICE_STUDENT_YEARLY),
    },
    source: rule ? "database" : "database-seed-fallback",
  };
}
