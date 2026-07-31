import { prisma } from "@/lib/prisma";

export type OnboardingStepPayload = Record<string, string | boolean | number | null>;

const PROFILE_FIELDS = new Set([
  "displayName",
  "countryCode",
  "languageCode",
  "currencyCode",
  "universityName",
  "courseName",
  "yearOfStudy",
  "studyGoal",
  "aiSupportLevel",
  "aiDailyReminder",
  "marketplaceInterest",
  "merchantInterested",
  "notificationEmail",
  "notificationPush",
  "notificationInApp",
]);

export async function getStudentOnboardingFlow() {
  return prisma.onboardingFlow.findUnique({
    where: { code: "student-v1" },
    include: {
      steps: {
        where: { active: true },
        orderBy: { sortOrder: "asc" },
      },
    },
  });
}

export async function getOrCreateOnboardingProfile(userId: string) {
  return prisma.userOnboardingProfile.upsert({
    where: { userId },
    update: {},
    create: { userId },
  });
}

export async function listOnboardingOptions(category?: string) {
  return prisma.onboardingOption.findMany({
    where: {
      active: true,
      ...(category ? { category } : {}),
    },
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }, { label: "asc" }],
  });
}

export async function getOnboardingState(userId: string) {
  const [flow, profile] = await Promise.all([
    getStudentOnboardingFlow(),
    getOrCreateOnboardingProfile(userId),
  ]);

  if (!flow) {
    return {
      flow: null,
      profile,
      progress: [],
      completionPercent: 0,
      currentStep: null,
      nextRoute: "/onboarding/welcome",
      completed: false,
    };
  }

  const progress = await prisma.userOnboardingProgress.findMany({
    where: { userId, stepId: { in: flow.steps.map((step) => step.id) } },
    include: { step: true },
  });

  const completedIds = new Set(
    progress.filter((item) => item.status === "COMPLETED").map((item) => item.stepId)
  );

  const currentStep = flow.steps.find((step) => !completedIds.has(step.id)) || flow.steps.at(-1) || null;
  const completionPercent = flow.steps.length
    ? Math.round((completedIds.size / flow.steps.length) * 100)
    : 0;

  return {
    flow,
    profile,
    progress,
    completionPercent,
    currentStep,
    nextRoute: currentStep?.route || "/student",
    completed: profile.completed,
  };
}

export async function completeOnboardingStep(
  userId: string,
  stepCode: string,
  payload: OnboardingStepPayload
) {
  const flow = await getStudentOnboardingFlow();
  if (!flow) throw new Error("ONBOARDING_FLOW_NOT_CONFIGURED");

  const step = flow.steps.find((item) => item.code === stepCode);
  if (!step) throw new Error("ONBOARDING_STEP_NOT_FOUND");

  const priorRequiredSteps = flow.steps.filter(
    (item) => item.required && item.sortOrder < step.sortOrder
  );

  if (priorRequiredSteps.length) {
    const completedPrior = await prisma.userOnboardingProgress.count({
      where: {
        userId,
        stepId: { in: priorRequiredSteps.map((item) => item.id) },
        status: "COMPLETED",
      },
    });
    if (completedPrior !== priorRequiredSteps.length) {
      throw new Error("ONBOARDING_SEQUENCE_VIOLATION");
    }
  }

  const profileData: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(payload)) {
    if (PROFILE_FIELDS.has(key)) profileData[key] = value;
  }

  if (step.code === "complete") {
    profileData.completed = true;
    profileData.completedAt = new Date();
  }

  const [progress] = await prisma.$transaction([
    prisma.userOnboardingProgress.upsert({
      where: { userId_stepId: { userId, stepId: step.id } },
      update: {
        status: "COMPLETED",
        data: payload,
        completedAt: new Date(),
      },
      create: {
        userId,
        stepId: step.id,
        status: "COMPLETED",
        data: payload,
        completedAt: new Date(),
      },
    }),
    prisma.userOnboardingProfile.upsert({
      where: { userId },
      update: profileData,
      create: { userId, ...profileData },
    }),
  ]);

  const nextStep = flow.steps.find((item) => item.sortOrder > step.sortOrder);
  return {
    progress,
    nextRoute: nextStep?.route || "/student",
    completed: step.code === "complete",
  };
}
