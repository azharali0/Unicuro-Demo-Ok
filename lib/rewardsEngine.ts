import { prisma } from "@/lib/prisma";
import { getWalletSummary } from "@/lib/studentEnginesDb";

export async function listRewards(userId: string) {
  const [rewardEvents, referralRewards, cashbackRewards, wallet] = await Promise.all([
    prisma.rewardEvent.findMany({ where: { userId }, orderBy: { createdAt: "desc" } }),
    prisma.referralReward.findMany({ where: { referrerId: userId }, orderBy: { createdAt: "desc" } }),
    prisma.cashbackReward.findMany({ where: { userId }, orderBy: { createdAt: "desc" } }),
    getWalletSummary(userId),
  ]);
  return { rewardEvents, referralRewards, cashbackRewards, wallet };
}

export async function createRewardEvent(input: { userId: string; type: string; source: string; amountCents: number; currencyCode: string; metadata?: any }) {
  const event = await prisma.rewardEvent.create({ data: input });
  const wallet = await prisma.studentWallet.upsert({
    where: { userId: input.userId },
    update: {},
    create: { userId: input.userId, currencyCode: input.currencyCode },
  });
  await prisma.studentWalletLedger.create({
    data: {
      walletId: wallet.id,
      userId: input.userId,
      type: "CREDIT",
      amountCents: input.amountCents,
      currencyCode: input.currencyCode,
      source: input.source,
      reference: event.id,
      status: "POSTED",
    },
  });
  return event;
}

export async function createReferralReward(input: { referrerId: string; referredId?: string; code: string; rewardCents: number; currencyCode?: string }) {
  return prisma.referralReward.create({
    data: {
      referrerId: input.referrerId,
      referredId: input.referredId,
      code: input.code,
      rewardCents: input.rewardCents,
      currencyCode: input.currencyCode || "USD",
    },
  });
}

export async function createCashbackReward(input: { userId: string; source: string; amountCents: number; currencyCode: string }) {
  return prisma.cashbackReward.create({ data: input });
}
