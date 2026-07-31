import { prisma } from "@/lib/prisma";

export async function getCountryProfile(countryCode: string) {
  return prisma.studentCountryProfile.findUnique({ where: { countryCode } });
}

export async function listCountryProfiles() {
  return prisma.studentCountryProfile.findMany({ where: { active: true }, orderBy: { countryName: "asc" } });
}

export async function getLocalizedStudentContext(countryCode: string) {
  const profile = await getCountryProfile(countryCode);
  const pricing = await prisma.pricingRegion.findFirst({ where: { countryCode, active: true } });
  const opportunities = await prisma.studentOpportunity.findMany({ where: { countryCode, active: true }, take: 10 });
  const scholarships = await prisma.studentScholarship.findMany({ where: { countryCode, active: true }, take: 10 });
  const deals = await prisma.studentDeal.findMany({ where: { countryCode, active: true }, take: 10 });
  return { profile, pricing, opportunities, scholarships, deals };
}
