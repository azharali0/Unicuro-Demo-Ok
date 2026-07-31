const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const steps = [
  ["welcome", "Welcome", "Start onboarding.", "/onboarding/welcome", []],
  ["profile", "Profile", "Set profile information.", "/onboarding/profile", ["displayName", "studyGoal"]],
  ["education", "Education", "Set university and course information.", "/onboarding/education", ["universityName", "courseName", "yearOfStudy"]],
  ["location", "Location", "Set country, language, currency, and timezone.", "/onboarding/location", ["countryCode", "languageCode", "currencyCode", "timezone"]],
  ["preferences", "Preferences", "Choose product preferences.", "/onboarding/preferences", ["marketplaceInterest", "merchantInterested"]],
  ["ai", "AI", "Choose AI study support.", "/onboarding/ai", ["aiSupportLevel", "aiDailyReminder"]],
  ["notifications", "Notifications", "Choose notification channels.", "/onboarding/notifications", ["notificationEmail", "notificationPush", "notificationInApp"]],
  ["marketplace", "Marketplace", "Configure marketplace discovery.", "/onboarding/marketplace", ["marketplaceInterest"]],
  ["merchant", "Merchant", "Configure merchant access.", "/onboarding/merchant", ["merchantInterested"]],
  ["complete", "Complete", "Complete onboarding.", "/onboarding/complete", []],
];

const options = [
  ["year_of_study", "foundation", "Foundation", 1],
  ["year_of_study", "year-1", "Year 1", 2],
  ["year_of_study", "year-2", "Year 2", 3],
  ["year_of_study", "year-3", "Year 3", 4],
  ["year_of_study", "year-4-plus", "Year 4 or above", 5],
  ["year_of_study", "postgraduate", "Postgraduate", 6],
  ["ai_support_level", "LIGHT", "Light guidance", 1],
  ["ai_support_level", "BALANCED", "Balanced support", 2],
  ["ai_support_level", "INTENSIVE", "Intensive revision support", 3],
  ["universities", "oxford", "University of Oxford", 1],
  ["universities", "cambridge", "University of Cambridge", 2],
  ["universities", "imperial", "Imperial College London", 3],
  ["universities", "ucl", "University College London", 4],
  ["universities", "lse", "London School of Economics", 5],
  ["universities", "edinburgh", "University of Edinburgh", 6],
  ["countries", "GB", "United Kingdom", 1],
  ["countries", "US", "United States", 2],
  ["countries", "AU", "Australia", 3],
  ["countries", "CA", "Canada", 4],
  ["timezones", "Europe/London", "Europe/London (GMT)", 1],
  ["timezones", "America/New_York", "America/New_York (EST)", 2],
  ["timezones", "Australia/Sydney", "Australia/Sydney (AEST)", 3],
];

async function main() {
  const flow = await prisma.onboardingFlow.upsert({
    where: { code: "student-v1" },
    update: {
      name: "Student Onboarding V1",
      description: "Database-driven onboarding flow.",
      role: "STUDENT",
      active: true,
    },
    create: {
      code: "student-v1",
      name: "Student Onboarding V1",
      description: "Database-driven onboarding flow.",
      role: "STUDENT",
      active: true,
    },
  });

  for (let index = 0; index < steps.length; index++) {
    const [code, title, description, route, fields] = steps[index];
    await prisma.onboardingStep.upsert({
      where: { flowId_code: { flowId: flow.id, code } },
      update: {
        title,
        description,
        route,
        sortOrder: index + 1,
        required: true,
        active: true,

      },
      create: {
        flowId: flow.id,
        code,
        title,
        description,
        route,
        sortOrder: index + 1,
        required: true,
        active: true,

      },
    });
  }

  for (const [category, value, label, sortOrder] of options) {
    await prisma.onboardingOption.upsert({
      where: { category_value: { category, value } },
      update: { label, sortOrder, active: true },
      create: { category, value, label, sortOrder, active: true },
    });
  }

  // Replaced dynamic country and timezone fetching with hardcoded demo data in options array above
}

main().finally(() => prisma.$disconnect());
