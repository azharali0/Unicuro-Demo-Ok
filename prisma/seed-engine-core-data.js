const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.communityCategory.upsert({
    where: { slug: "student-life" },
    update: { status: "ACTIVE" },
    create: { name: "Student Life", slug: "student-life", description: "General student life discussions." },
  });

  await prisma.communityCategory.upsert({
    where: { slug: "money-and-opportunities" },
    update: { status: "ACTIVE" },
    create: { name: "Money & Opportunities", slug: "money-and-opportunities", description: "Discounts, scholarships, jobs and student income." },
  });
}

main().finally(() => prisma.$disconnect());
