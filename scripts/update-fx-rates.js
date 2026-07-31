const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const fallback = { USD: 1, GBP: 0.79, CAD: 1.36, AUD: 1.51, INR: 83, NGN: 1500, ZAR: 18.3, EUR: 0.92 };

function round99(cents) {
  if (cents < 100) return Math.max(99, Math.round(cents));
  return Math.floor(cents / 100) * 100 + 99;
}

async function main() {
  const regions = await prisma.pricingRegion.findMany({ where: { active: true } });
  const plans = await prisma.pricingPlan.findMany({ where: { active: true } });

  for (const region of regions) {
    const rate = fallback[region.currencyCode] || 1;
    await prisma.pricingRegion.update({ where: { countryCode: region.countryCode }, data: { exchangeRateFromUsd: rate } });
    await prisma.fxRateSnapshot.create({ data: { baseCurrency: "USD", targetCurrency: region.currencyCode, rate, provider: "script-fallback" } });
    for (const plan of plans) {
      await prisma.pricingRule.upsert({
        where: { pricingPlanId_pricingRegionId: { pricingPlanId: plan.id, pricingRegionId: region.id } },
        update: { localMonthlyCents: round99(plan.monthlyUsdCents * rate), localQuarterlyCents: round99(plan.quarterlyUsdCents * rate), localYearlyCents: round99(plan.yearlyUsdCents * rate) },
        create: { pricingPlanId: plan.id, pricingRegionId: region.id, localMonthlyCents: round99(plan.monthlyUsdCents * rate), localQuarterlyCents: round99(plan.quarterlyUsdCents * rate), localYearlyCents: round99(plan.yearlyUsdCents * rate) },
      });
    }
  }

  console.log("FX rates and pricing rules updated.");
}

main().finally(() => prisma.$disconnect());
