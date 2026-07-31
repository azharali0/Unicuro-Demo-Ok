const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const homepage = await prisma.homepageContent.upsert({
    where: { key: "main" },
    update: {
      heroHeadline: "Save Money. Make Money. Succeed at University.",
      heroSubheadline: "UniSphere brings student discounts, income opportunities, study support, wallet, marketplace and university life into one daily operating system.",
      primaryCtaLabel: "Start as Student",
      primaryCtaHref: "/login",
      secondaryCtaLabel: "View Pricing",
      secondaryCtaHref: "/pricing",
      status: "PUBLISHED",
    },
    create: {
      key: "main",
      heroHeadline: "Save Money. Make Money. Succeed at University.",
      heroSubheadline: "UniSphere brings student discounts, income opportunities, study support, wallet, marketplace and university life into one daily operating system.",
      primaryCtaLabel: "Start as Student",
      primaryCtaHref: "/login",
      secondaryCtaLabel: "View Pricing",
      secondaryCtaHref: "/pricing",
      status: "PUBLISHED",
    },
  });

  await prisma.homepageSection.deleteMany({ where: { homepageContentId: homepage.id } });
  await prisma.homepageSection.createMany({
    data: [
      { homepageContentId: homepage.id, sortOrder: 1, sectionType: "SAVE", title: "Student discounts that matter", body: "Relevant deals, premium savings, cashback and local offers based on the student's region.", ctaHref: "/student/discounts", ctaLabel: "Explore discounts" },
      { homepageContentId: homepage.id, sortOrder: 2, sectionType: "EARN", title: "Income while studying", body: "Discover gigs, jobs, merchant selling and scholarship opportunities from one place.", ctaHref: "/student/earn", ctaLabel: "Find opportunities" },
      { homepageContentId: homepage.id, sortOrder: 3, sectionType: "SUCCEED", title: "Academic and life support", body: "AI study support, planner tools, community, wellbeing and marketplace resources help students stay on track.", ctaHref: "/student/academic", ctaLabel: "Open study tools" },
    ],
  });

  await prisma.homepageMetric.deleteMany({});
  await prisma.homepageMetric.createMany({
    data: [
      { label: "Core pillars", value: "3", sortOrder: 1 },
      { label: "Student modules", value: "18", sortOrder: 2 },
      { label: "Pricing base", value: "USD", sortOrder: 3 },
    ],
  });
}

main().finally(() => prisma.$disconnect());
