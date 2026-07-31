const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash("password123", 10);
  
  // Create Student
  const student = await prisma.user.upsert({
    where: { email: 'student@unicuro.com' },
    update: { password: hash, role: 'STUDENT' },
    create: {
      email: 'student@unicuro.com',
      name: 'Tim Student',
      password: hash,
      role: 'STUDENT',
    },
  });
  console.log(`Ensured student user: ${student.email}`);

  // Create Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@unicuro.com' },
    update: { password: hash, role: 'ADMIN' },
    create: {
      email: 'admin@unicuro.com',
      name: 'Tim Admin',
      password: hash,
      role: 'ADMIN',
    },
  });
  console.log(`Ensured admin user: ${admin.email}`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
