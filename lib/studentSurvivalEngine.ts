import { prisma } from "@/lib/prisma";

export async function getBudget(userId: string) {
  return prisma.studentBudgetPlan.findFirst({
    where: { userId, status: "ACTIVE" },
    include: { categories: { orderBy: { sortOrder: "asc" } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function createBudget(userId: string, data: { currencyCode: string; periodStart: Date; periodEnd: Date; incomeCents: number; savingsTargetCents?: number }) {
  return prisma.studentBudgetPlan.create({ data: { userId, expenseCents: 0, ...data } });
}

export async function listHabits(userId: string) {
  return prisma.studentHabit.findMany({
    where: { userId, active: true },
    include: { entries: { orderBy: { entryDate: "desc" }, take: 14 } },
    orderBy: { createdAt: "desc" },
  });
}

export async function createHabit(userId: string, data: { title: string; category: string; targetCount?: number; frequency: string }) {
  return prisma.studentHabit.create({ data: { userId, ...data } });
}

export async function startFocusSession(userId: string, data: { sessionType: string; workspaceId?: string }) {
  return prisma.focusSession.create({ data: { userId, startedAt: new Date(), ...data } });
}

export async function endFocusSession(userId: string, id: string) {
  const session = await prisma.focusSession.findFirst({ where: { id, userId } });
  if (!session) throw new Error("FOCUS_SESSION_NOT_FOUND");
  const endedAt = new Date();
  const durationMin = Math.max(1, Math.round((endedAt.getTime() - session.startedAt.getTime()) / 60000));
  return prisma.focusSession.update({ where: { id }, data: { endedAt, durationMin, status: "COMPLETED" } });
}
