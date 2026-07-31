const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Deleting temporary test accounts...");
  await prisma.user.deleteMany({
    where: {
      email: { in: ['teststudent@unicuro.com', 'testmerchant@unicuro.com', 'testadmin@unicuro.com'] }
    }
  });

  console.log("Fetching existing accounts...");
  const users = await prisma.user.findMany({
    where: {
      email: { notIn: ['superadmin@unicuro.com'] }
    }
  });

  for (const user of users) {
    console.log(`Seeding data for ${user.email} (${user.role})...`);

    if (user.role === 'STUDENT') {
      // Student Profile
      await prisma.studentProfile.upsert({
        where: { userId: user.id },
        update: {},
        create: {
          userId: user.id,
          course: 'Computer Science',
          internationalStudent: false
        }
      });

      // Wallet
      const wallet = await prisma.wallet.upsert({
        where: { userId: user.id },
        update: {},
        create: {
          userId: user.id,
          balance: 500,
          points: 1500,
        }
      });

      // Wallet Ledger
      const ledgerCount = await prisma.walletLedger.count({ where: { walletId: wallet.id } });
      if (ledgerCount < 5) {
        await prisma.walletLedger.createMany({
          data: Array.from({ length: 5 }).map((_, i) => ({
            walletId: wallet.id,
            type: i % 2 === 0 ? 'CREDIT' : 'DEBIT',
            title: `Transaction ${i + 1}`,
            amount: 25.50 * (i + 1),
            status: 'COMPLETED'
          }))
        });
      }

      // Tasks
      const taskCount = await prisma.task.count({ where: { userId: user.id } });
      if (taskCount < 5) {
        await prisma.task.createMany({
          data: Array.from({ length: 5 }).map((_, i) => ({
            userId: user.id,
            title: `Complete Coursework Module ${i + 1}`,
            priority: i % 2 === 0 ? 'HIGH' : 'NORMAL',
            done: i < 2
          }))
        });
      }

      // Deadlines
      const deadlineCount = await prisma.deadline.count({ where: { userId: user.id } });
      if (deadlineCount < 5) {
        await prisma.deadline.createMany({
          data: Array.from({ length: 5 }).map((_, i) => ({
            userId: user.id,
            title: `Assignment Submission ${i + 1}`,
            dueDate: new Date(Date.now() + (i + 1) * 86400000)
          }))
        });
      }

      // Support Tickets
      const ticketCount = await prisma.supportTicket.count({ where: { userId: user.id } });
      if (ticketCount < 5) {
        await prisma.supportTicket.createMany({
          data: Array.from({ length: 5 }).map((_, i) => ({
            userId: user.id,
            subject: `Help Request ${i + 1}`,
            category: 'ACCOUNT',
            status: i % 2 === 0 ? 'OPEN' : 'RESOLVED',
            description: 'I need assistance with my account settings.'
          }))
        });
      }

      // Notifications
      const notifCount = await prisma.notification.count({ where: { userId: user.id } });
      if (notifCount < 5) {
        await prisma.notification.createMany({
          data: Array.from({ length: 5 }).map((_, i) => ({
            userId: user.id,
            title: `System Alert ${i + 1}`,
            body: 'Your account has a new update.',
            category: 'SYSTEM',
            read: i < 3
          }))
        });
      }

      // Study Assets
      const studyCount = await prisma.studyAsset.count({ where: { userId: user.id } });
      if (studyCount < 5) {
        await prisma.studyAsset.createMany({
          data: Array.from({ length: 5 }).map((_, i) => ({
            userId: user.id,
            title: `Lecture Notes ${i + 1}`,
            type: 'NOTES',
            module: 'CS101',
            aiStatus: 'COMPLETED'
          }))
        });
      }
    }

    if (user.role === 'MERCHANT') {
      // Marketplace Listings
      const listingCount = await prisma.marketplaceListing.count({ where: { userId: user.id } });
      if (listingCount < 5) {
        await prisma.marketplaceListing.createMany({
          data: Array.from({ length: 5 }).map((_, i) => ({
            userId: user.id,
            title: `Used Textbook Volume ${i + 1}`,
            category: 'BOOKS',
            price: 15.00 + i * 5,
            currency: 'GBP',
            status: 'LIVE'
          }))
        });
      }

      // Deals
      const dealCount = await prisma.deal.count({ where: { merchant: user.id } });
      if (dealCount < 5) {
        await prisma.deal.createMany({
          data: Array.from({ length: 5 }).map((_, i) => ({
            merchant: user.id,
            title: `Student Discount ${i + 1}0% Off`,
            category: 'FOOD',
            discount: `${i + 1}0%`,
            active: true
          }))
        });
      }
    }

    if (user.role === 'ADMIN') {
      // Audit Logs
      const auditCount = await prisma.auditLog.count({ where: { actorId: user.id } });
      if (auditCount < 5) {
        await prisma.auditLog.createMany({
          data: Array.from({ length: 5 }).map((_, i) => ({
            actorId: user.id,
            action: 'USER_UPDATED',
            entity: 'USER',
            entityId: user.id
          }))
        });
      }

      // Security Events
      const securityCount = await prisma.securityEvent.count({ where: { actorId: user.id } });
      if (securityCount < 5) {
        await prisma.securityEvent.createMany({
          data: Array.from({ length: 5 }).map((_, i) => ({
            actorId: user.id,
            type: 'FAILED_LOGIN',
            severity: 'LOW',
            source: 'WEB'
          }))
        });
      }
    }
  }

  console.log("Successfully seeded all existing accounts and deleted the test ones!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
