import { prisma } from "@/lib/prisma";

export async function getStudentTwin(userId: string) {
  const profile = await prisma.studentTwinProfile.upsert({ where: { userId }, update: {}, create: { userId } });
  const [signals, recommendations, briefs] = await Promise.all([
    prisma.studentTwinSignal.findMany({ where: { userId }, orderBy: { capturedAt: "desc" }, take: 50 }),
    prisma.studentTwinRecommendation.findMany({ where: { userId, status: "ACTIVE" }, orderBy: [{ priority: "desc" }, { createdAt: "desc" }] }),
    prisma.studentDailyBrief.findMany({ where: { userId }, orderBy: { briefDate: "desc" }, take: 7 }),
  ]);
  return { profile, signals, recommendations, briefs };
}

export async function recordTwinSignal(userId: string, data: { signalType: string; value: number; unit?: string; source: string; metadata?: any }) {
  return prisma.studentTwinSignal.create({ data: { userId, ...data } });
}

export async function createTwinRecommendation(userId: string, data: { category: string; title: string; message: string; priority?: string; actionRoute?: string; expiresAt?: Date }) {
  return prisma.studentTwinRecommendation.create({ data: { userId, ...data } });
}

export async function generateDailyBrief(userId: string) {
  const [tasks, wellbeing, wallet, coursework] = await Promise.all([
    prisma.studentTask.findMany({ where: { userId, status: { not: "COMPLETED" } }, orderBy: { dueAt: "asc" }, take: 5 }),
    prisma.studentWellbeingCheckIn.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: 1 }),
    prisma.studentWalletLedger.findMany({ where: { userId, status: "POSTED" }, orderBy: { createdAt: "desc" }, take: 20 }),
    prisma.courseworkWorkspace.findMany({ where: { userId, status: "ACTIVE" }, orderBy: { deadlineAt: "asc" }, take: 5 }),
  ]);

  const balanceCents = wallet.reduce((sum, row) => sum + row.amountCents, 0);
  const summary = `You have ${tasks.length} active tasks and ${coursework.length} active coursework workspaces.`;
  const actions = [
    ...tasks.slice(0, 2).map((task) => ({ label: task.title, route: "/student/planner" })),
    ...coursework.slice(0, 2).map((item) => ({ label: item.title, route: "/student/coursework" })),
    { label: `Review budget balance: ${balanceCents}`, route: "/student/budget" },
  ];
  const briefDate = new Date();
  briefDate.setHours(0, 0, 0, 0);

  return prisma.studentDailyBrief.upsert({
    where: { userId_briefDate: { userId, briefDate } },
    update: { summary, actions, riskFlags: { wellbeing: wellbeing[0] || null } },
    create: { userId, briefDate, summary, actions, riskFlags: { wellbeing: wellbeing[0] || null } },
  });
}
