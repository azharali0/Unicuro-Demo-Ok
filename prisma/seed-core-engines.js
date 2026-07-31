const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {
  await prisma.studentDeal.upsert({
    where: { id: "deal-student-books-us" },
    update: { active: true },
    create: { id: "deal-student-books-us", merchantName: "Campus Book Partner", title: "Student textbook savings", description: "Verified student offer for academic books.", category: "books", countryCode: "US", currencyCode: "USD", discountLabel: "Up to 20%", active: true }
  });
  await prisma.studentOpportunity.upsert({
    update: { active: true },
  });
  await prisma.studentScholarship.upsert({
    where: { id: "scholarship-general-student-support" },
    update: { active: true },
    create: { id: "scholarship-general-student-support", title: "General Student Support Fund", provider: "Verified Funding Partner", countryCode: "US", amountLabel: "Varies", eligibility: "Open to eligible students based on provider criteria.", active: true }
  });
}
main().finally(() => prisma.$disconnect());
