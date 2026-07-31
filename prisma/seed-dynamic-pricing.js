const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const regions = [
  ["US", "United States", "USD", "$", 1, "en"],
  ["GB", "United Kingdom", "GBP", "£", 0.79, "en"],
  ["CA", "Canada", "CAD", "CA$", 1.36, "en"],
  ["AU", "Australia", "AUD", "AU$", 1.51, "en"],
  ["IN", "India", "INR", "₹", 83, "hi"],
  ["NG", "Nigeria", "NGN", "₦", 1500, "en"],
  ["ZA", "South Africa", "ZAR", "R", 18.3, "en"],
  ["EU", "European Union", "EUR", "€", 0.92, "en"],
];

function round99(cents) {
  if (cents < 100) return Math.max(99, Math.round(cents));
  return Math.floor(cents / 100) * 100 + 99;
}

async function main() {
  const plan = await prisma.pricingPlan.upsert({
    where: { code: "STUDENT_PREMIUM" },
    update: {
      name: "UniSphere Premium",
      description: "Premium discounts, AI academic support, cashback boosts and career tools.",
      baseCurrency: "USD",
      monthlyUsdCents: 799,
      quarterlyUsdCents: 2099,
      yearlyUsdCents: 7499,
      active: true,
    },
    create: {
      code: "STUDENT_PREMIUM",
      name: "UniSphere Premium",
      description: "Premium discounts, AI academic support, cashback boosts and career tools.",
      baseCurrency: "USD",
      monthlyUsdCents: 799,
      quarterlyUsdCents: 2099,
      yearlyUsdCents: 7499,
      active: true,
    },
  });

  for (const [countryCode, countryName, currencyCode, currencySymbol, rate, defaultLanguage] of regions) {
    const region = await prisma.pricingRegion.upsert({
      where: { countryCode },
      update: { countryName, currencyCode, currencySymbol, exchangeRateFromUsd: rate, defaultLanguage, active: true },
      create: { countryCode, countryName, currencyCode, currencySymbol, exchangeRateFromUsd: rate, defaultLanguage, active: true },
    });
    await prisma.pricingRule.upsert({
      where: { pricingPlanId_pricingRegionId: { pricingPlanId: plan.id, pricingRegionId: region.id } },
      update: {
        localMonthlyCents: round99(799 * rate),
        localQuarterlyCents: round99(2099 * rate),
        localYearlyCents: round99(7499 * rate),
      },
      create: {
        pricingPlanId: plan.id,
        pricingRegionId: region.id,
        localMonthlyCents: round99(799 * rate),
        localQuarterlyCents: round99(2099 * rate),
        localYearlyCents: round99(7499 * rate),
      },
    });
  }

  await prisma.promoCode.upsert({
    where: { code: "FOUNDING50" },
    update: { active: true },
    create: {
      code: "FOUNDING50",
      description: "50% founding student launch offer.",
      discountPercent: 50,
      startsAt: new Date("2026-01-01T00:00:00.000Z"),
      expiresAt: new Date("2027-01-01T00:00:00.000Z"),
      maxRedemptions: 10000,
      active: true,
    },
  });
}

main().finally(() => prisma.$disconnect());
