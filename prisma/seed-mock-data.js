const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  console.log("Seeding users...");
  // Create Users
  const student = await prisma.user.upsert({
    where: { email: 'teststudent@unicuro.com' },
    update: {},
    create: {
      email: 'teststudent@unicuro.com',
      name: 'Test Student',
      password: hashedPassword,
      role: 'STUDENT',
      countryCode: 'GB',
    }
  });

  const merchant = await prisma.user.upsert({
    where: { email: 'testmerchant@unicuro.com' },
    update: {},
    create: {
      email: 'testmerchant@unicuro.com',
      name: 'Test Merchant',
      password: hashedPassword,
      role: 'MERCHANT',
      countryCode: 'GB',
    }
  });

  const admin = await prisma.user.upsert({
    where: { email: 'testadmin@unicuro.com' },
    update: {},
    create: {
      email: 'testadmin@unicuro.com',
      name: 'Test Admin',
      password: hashedPassword,
      role: 'ADMIN',
      countryCode: 'GB',
    }
  });

  console.log("Seeding Student Profile and Wallet...");
  // Student Profile
  await prisma.studentProfile.upsert({
    where: { userId: student.id },
    update: {},
    create: {
      userId: student.id,
      course: 'Computer Science',
      internationalStudent: false
    }
  });

  // Wallet
  const wallet = await prisma.wallet.upsert({
    where: { userId: student.id },
    update: { balance: 500, points: 1500 },
    create: {
      userId: student.id,
      balance: 500,
      points: 1500,
    }
  });

  console.log("Seeding Core Entities (5 entries each)...");
  
  // Wallet Ledger
  await prisma.walletLedger.deleteMany({ where: { walletId: wallet.id } });
  await prisma.walletLedger.createMany({
    data: Array.from({ length: 5 }).map((_, i) => ({
      walletId: wallet.id,
      type: i % 2 === 0 ? 'CREDIT' : 'DEBIT',
      title: `Transaction ${i + 1}`,
      amount: 25.50 * (i + 1),
      status: 'COMPLETED'
    }))
  });

  // Tasks
  await prisma.task.deleteMany({ where: { userId: student.id } });
  await prisma.task.createMany({
    data: Array.from({ length: 5 }).map((_, i) => ({
      userId: student.id,
      title: `Complete Coursework Module ${i + 1}`,
      priority: i % 2 === 0 ? 'HIGH' : 'NORMAL',
      done: i < 2
    }))
  });

  // Deadlines
  await prisma.deadline.deleteMany({ where: { userId: student.id } });
  await prisma.deadline.createMany({
    data: Array.from({ length: 5 }).map((_, i) => ({
      userId: student.id,
      title: `Assignment Submission ${i + 1}`,
      dueDate: new Date(Date.now() + (i + 1) * 86400000)
    }))
  });

  // Marketplace Listings
  await prisma.marketplaceListing.deleteMany({ where: { userId: merchant.id } });
  await prisma.marketplaceListing.createMany({
    data: Array.from({ length: 5 }).map((_, i) => ({
      userId: merchant.id,
      title: `Used Textbook Volume ${i + 1}`,
      category: 'BOOKS',
      price: 15.00 + i * 5,
      currency: 'GBP',
      status: 'LIVE'
    }))
  });

  // Deals
  await prisma.deal.deleteMany({ where: { merchant: merchant.id } });
  await prisma.deal.createMany({
    data: Array.from({ length: 5 }).map((_, i) => ({
      merchant: merchant.id,
      title: `Student Discount ${i + 1}0% Off`,
      category: 'FOOD',
      discount: `${i + 1}0%`,
      active: true
    }))
  });

  // Support Tickets
  await prisma.supportTicket.deleteMany({ where: { userId: student.id } });
  await prisma.supportTicket.createMany({
    data: Array.from({ length: 5 }).map((_, i) => ({
      userId: student.id,
      subject: `Help Request ${i + 1}`,
      category: 'ACCOUNT',
      status: i % 2 === 0 ? 'OPEN' : 'RESOLVED',
      description: 'I need assistance with my account settings.'
    }))
  });

  // Notifications
  await prisma.notification.deleteMany({ where: { userId: student.id } });
  await prisma.notification.createMany({
    data: Array.from({ length: 5 }).map((_, i) => ({
      userId: student.id,
      title: `System Alert ${i + 1}`,
      body: 'Your account has a new update.',
      category: 'SYSTEM',
      read: i < 3
    }))
  });

  // Study Assets
  await prisma.studyAsset.deleteMany({ where: { userId: student.id } });
  await prisma.studyAsset.createMany({
    data: Array.from({ length: 5 }).map((_, i) => ({
      userId: student.id,
      title: `Lecture Notes ${i + 1}`,
      type: 'NOTES',
      module: 'CS101',
      aiStatus: 'COMPLETED'
    }))
  });

  // Audit Logs
  await prisma.auditLog.deleteMany({ where: { actorId: admin.id } });
  await prisma.auditLog.createMany({
    data: Array.from({ length: 5 }).map((_, i) => ({
      actorId: admin.id,
      action: 'USER_UPDATED',
      entity: 'USER',
      entityId: student.id
    }))
  });

  // Security Events
  await prisma.securityEvent.deleteMany({ where: { actorId: admin.id } });
  await prisma.securityEvent.createMany({
    data: Array.from({ length: 5 }).map((_, i) => ({
      actorId: admin.id,
      type: 'FAILED_LOGIN',
      severity: 'LOW',
      source: 'WEB'
    }))
  });

  console.log("Mock data successfully seeded!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
