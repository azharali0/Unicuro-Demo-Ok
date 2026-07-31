import { prisma } from "@/lib/prisma";

export async function listStudentTasks(userId: string) {
  return prisma.studentTask.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });
}
export async function createStudentTask(userId: string, data: any) {
  return prisma.studentTask.create({ data: { userId, ...data } });
}
export async function getWalletSummary(userId: string) {
  const wallet = await prisma.studentWallet.upsert({ where: { userId }, update: {}, create: { userId, currencyCode: "USD" } });
  const ledger = await prisma.studentWalletLedger.findMany({ where: { userId, status: "POSTED" }, orderBy: { createdAt: "desc" } });
  const balanceCents = ledger.reduce((sum, row) => sum + row.amountCents, 0);
  return { wallet, ledger, balanceCents };
}
export async function listDeals(countryCode?: string, includePremium = false) {
  return prisma.studentDeal.findMany({
    where: {
      active: true,
      ...(countryCode ? { countryCode } : {}),
      ...(includePremium ? {} : { premiumOnly: false }),
    },
    orderBy: [{ premiumOnly: "asc" }, { createdAt: "desc" }],
  });
}
export async function listOpportunities(countryCode?: string) {
  return prisma.studentOpportunity.findMany({
    where: { active: true, ...(countryCode ? { countryCode } : {}) },
    orderBy: [{ remote: "desc" }, { createdAt: "desc" }],
  });
}
export async function listScholarships(countryCode = "US") {
  return prisma.studentScholarship.findMany({ where: { countryCode, active: true }, orderBy: { createdAt: "desc" } });
}
export async function createWellbeingCheckIn(userId: string, data: any) {
  return prisma.studentWellbeingCheckIn.create({ data: { userId, ...data } });
}
export async function getCareerProfile(userId: string) {
  return prisma.studentCareerProfile.upsert({ where: { userId }, update: {}, create: { userId, skills: [] } });
}
export async function updateCareerProfile(userId: string, data: any) {
  return prisma.studentCareerProfile.upsert({ where: { userId }, update: data, create: { userId, skills: data.skills || [], targetRole: data.targetRole, cvUrl: data.cvUrl } });
}
export async function listMarketplaceListings() {
  return prisma.studentMarketplaceListing.findMany({ where: { status: "ACTIVE" }, orderBy: { createdAt: "desc" } });
}
export async function createMarketplaceListing(sellerId: string, data: any) {
  return prisma.studentMarketplaceListing.create({ data: { sellerId, ...data } });
}

export async function getStudentSettings(userId: string) {
  const [localisation, notifications, onboarding] = await Promise.all([
    prisma.localisationPreference.upsert({ where: { userId }, update: {}, create: { userId } }),
    prisma.notificationPreference.upsert({ where: { userId }, update: {}, create: { userId } }),
    prisma.userOnboardingProfile.findUnique({ where: { userId } }),
  ]);
  return { localisation, notifications, onboarding };
}

export async function updateStudentSettings(userId: string, data: {
  languageCode?: string; countryCode?: string; currencyCode?: string; timezone?: string;
  email?: boolean; push?: boolean; inApp?: boolean; marketing?: boolean;
}) {
  const localisationData = {
    ...(data.languageCode !== undefined ? { languageCode: data.languageCode } : {}),
    ...(data.countryCode !== undefined ? { countryCode: data.countryCode } : {}),
    ...(data.currencyCode !== undefined ? { currencyCode: data.currencyCode } : {}),
    ...(data.timezone !== undefined ? { timezone: data.timezone } : {}),
  };
  const notificationData = {
    ...(data.email !== undefined ? { email: data.email } : {}),
    ...(data.push !== undefined ? { push: data.push } : {}),
    ...(data.inApp !== undefined ? { inApp: data.inApp } : {}),
    ...(data.marketing !== undefined ? { marketing: data.marketing } : {}),
  };
  const [localisation, notifications] = await Promise.all([
    prisma.localisationPreference.upsert({ where: { userId }, update: localisationData, create: { userId, ...localisationData } }),
    prisma.notificationPreference.upsert({ where: { userId }, update: notificationData, create: { userId, ...notificationData } }),
  ]);
  return { localisation, notifications };
}
