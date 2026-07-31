const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  console.log(`Found ${users.length} users. Hashing 'password123'...`);
  const hash = await bcrypt.hash("password123", 10);
  
  for (const user of users) {
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hash }
    });
    console.log(`Updated user ${user.email} with default password.`);
  }
  
  console.log("All existing users have been assigned the password 'password123'");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
