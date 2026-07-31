import { prisma } from "@/lib/prisma";

export async function buildTwinSnapshot(userId: string) {
  const [tasks, wallet, career, wellbeing, coursework, focus] = await Promise.all([
    prisma.studentTask.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: 100 }),
    prisma.studentWalletLedger.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: 100 }),
    prisma.studentCareerProfile.findUnique({ where: { userId } }),
    prisma.studentWellbeingCheckIn.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: 30 }),
    prisma.courseworkWorkspace.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: 50 }),
    prisma.focusSession.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: 50 }),
  ]);

  const academic = {
    openTasks: tasks.filter((t) => t.status !== "COMPLETED").length,
    activeCoursework: coursework.filter((c) => c.status === "ACTIVE").length,
  };
  const financial = {
    balanceCents: wallet.reduce((sum, row) => sum + row.amountCents, 0),
  };
  const careerData = {
    targetRole: career?.targetRole || null,
  };
  const wellbeingData = {
    latest: wellbeing[0] || null,
  };
  const productivity = {
    completedFocusSessions: focus.filter((f) => f.status === "COMPLETED").length,
    totalFocusMinutes: focus.reduce((sum, f) => sum + (f.durationMin || 0), 0),
  };

  return prisma.twinModelSnapshot.create({
    data: { userId, academic, financial, career: careerData, wellbeing: wellbeingData, productivity },
  });
}

export async function createTwinActionPlan(userId: string) {
  const snapshot = await buildTwinSnapshot(userId);
  const academic: any = snapshot.academic;
  const financial: any = snapshot.financial;
  const actions = [];
  if (academic.openTasks > 0) actions.push({ label: "Review open tasks", route: "/student/planner" });
  if (academic.activeCoursework > 0) actions.push({ label: "Continue coursework", route: "/student/coursework" });
  if (financial.balanceCents < 0) actions.push({ label: "Review budget", route: "/student/budget" });

  return prisma.twinActionPlan.create({
    data: { userId, category: "DAILY", title: "Your Twin AI action plan", actions },
  });
}

export async function getTwinDashboard(userId: string) {
  const [snapshots, plans, recommendations] = await Promise.all([
    prisma.twinModelSnapshot.findMany({ where: { userId }, orderBy: { snapshotAt: "desc" }, take: 10 }),
    prisma.twinActionPlan.findMany({ where: { userId, status: "ACTIVE" }, orderBy: { createdAt: "desc" } }),
    prisma.studentTwinRecommendation.findMany({ where: { userId, status: "ACTIVE" }, orderBy: { createdAt: "desc" } }),
  ]);
  return { snapshots, plans, recommendations };
}
