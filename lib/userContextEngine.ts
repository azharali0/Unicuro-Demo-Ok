import { prisma } from "@/lib/prisma";

export async function getUserCountryCode(userId: string) {
  const [localisation, onboarding] = await Promise.all([
    prisma.localisationPreference.findUnique({ where: { userId } }),
    prisma.userOnboardingProfile.findUnique({ where: { userId } }),
  ]);
  return localisation?.countryCode || onboarding?.countryCode || null;
}
