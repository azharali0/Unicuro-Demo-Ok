import { prisma } from "@/lib/prisma";

export async function getStudentOnboardingFlow() {
  return prisma.onboardingFlow.findUnique({
    where: { code: "student-v1" },
    include: { steps: { where: { active: true }, orderBy: { sortOrder: "asc" } } },
  });
}

export async function getOrCreateOnboardingProfile(userId: string) {
  return prisma.userOnboardingProfile.upsert({ where: { userId }, update: {}, create: { userId } });
}

export async function getOnboardingState(userId: string) {
  const flow = await getStudentOnboardingFlow();
  const profile = await getOrCreateOnboardingProfile(userId);
  if (!flow) return { flow: null, profile, progress: [], completionPercent: 0, nextRoute: "/onboarding/welcome" };
  const progress = await prisma.userOnboardingProgress.findMany({ where: { userId, stepId: { in: flow.steps.map((s) => s.id) } }, include: { step: true } });
  const done = new Set(progress.filter((p) => p.status === "COMPLETED").map((p) => p.stepId));
  const next = flow.steps.find((s) => !done.has(s.id));
  return { flow, profile, progress, completionPercent: Math.round((done.size / flow.steps.length) * 100), nextRoute: next?.route || "/onboarding/complete" };
}

export async function completeOnboardingStep(userId: string, code: string, data: any = {}) {
  const flow = await getStudentOnboardingFlow();
  if (!flow) throw new Error("ONBOARDING_FLOW_NOT_CONFIGURED");
  const step = flow.steps.find((s) => s.code === code);
  if (!step) throw new Error("ONBOARDING_STEP_NOT_CONFIGURED");

  const profileFields = [
    "displayName","countryCode","languageCode","currencyCode","universityName","courseName","yearOfStudy","studyGoal",
    "aiSupportLevel","aiDailyReminder","marketplaceInterest","merchantInterested","notificationEmail","notificationPush","notificationInApp"
  ];
  const update: any = {};
  for (const key of profileFields) if (data[key] !== undefined) update[key] = data[key];
  if (code === "complete") { update.completed = true; update.completedAt = new Date(); }

  const [progress] = await Promise.all([
    prisma.userOnboardingProgress.upsert({
      where: { userId_stepId: { userId, stepId: step.id } },
      update: { status: "COMPLETED", completedAt: new Date(), data },
      create: { userId, stepId: step.id, status: "COMPLETED", completedAt: new Date(), data },
    }),
    prisma.userOnboardingProfile.upsert({ where: { userId }, update, create: { userId, ...update } }),
  ]);
  return progress;
}

export async function listOnboardingOptions(category?: string) {
  return prisma.onboardingOption.findMany({ where: { active: true, ...(category ? { category } : {}) }, orderBy: [{ category: "asc" }, { sortOrder: "asc" }] });
}
