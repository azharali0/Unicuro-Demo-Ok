const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const services = [
    ["ACCOMMODATION", "Accommodation guidance", "Find verified accommodation guidance and support resources."],
    ["TRANSPORT", "Transport support", "Find transport guidance and student travel information."],
    ["BILLS", "Bills and utilities", "Access budgeting and household-bill guidance."],
    ["FOOD", "Food and essential support", "Discover available food, grocery, and essential-support resources."],
    ["VISA", "Visa and immigration guidance", "Access general immigration guidance and signposting."],
    ["EMERGENCY", "Emergency support", "Find emergency and urgent student-support resources."],
  ];
  for (const [category, title, description] of services) {
    const existing = await prisma.studentLifeService.findFirst({ where: { category, title } });
    if (!existing) await prisma.studentLifeService.create({ data: { category, title, description, active: true } });
  }
}

main().finally(() => prisma.$disconnect());
