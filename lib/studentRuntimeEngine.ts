import { prisma } from "@/lib/prisma";

export async function getStudentProfile(userId: string) {
  return prisma.studentProfile.upsert({ where: { userId }, update: {}, create: { userId } });
}
export async function updateStudentProfile(userId: string, data: any) {
  return prisma.studentProfile.upsert({ where: { userId }, update: data, create: { userId, ...data } });
}
export async function getWallet(userId: string) {
  const wallet = await prisma.studentWallet.upsert({ where: { userId }, update: {}, create: { userId, currencyCode: "USD" } });
  const ledger = await prisma.studentWalletLedger.findMany({ where: { walletId: wallet.id }, orderBy: { createdAt: "desc" } });
  const balanceCents = ledger.reduce((sum, row) => sum + row.amountCents, 0);
  return { wallet, ledger, balanceCents };
}
export async function getBudget(userId: string) {
  return prisma.studentBudgetPlan.findFirst({ where: { userId, status: "ACTIVE" }, include: { categories: true }, orderBy: { createdAt: "desc" } });
}
export async function listCareerData(userId: string) {
  const [profile, scholarships, opportunities] = await Promise.all([
    prisma.studentCareerProfile.upsert({ where: { userId }, update: {}, create: { userId } }),
    prisma.studentScholarship.findMany({ where: { active: true }, orderBy: { createdAt: "desc" } }),
    prisma.studentOpportunity.findMany({ where: { active: true }, orderBy: { createdAt: "desc" } }),
  ]);
  return { profile, scholarships, opportunities };
}
