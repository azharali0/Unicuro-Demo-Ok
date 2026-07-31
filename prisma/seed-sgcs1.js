const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main(){
  const flags = [
    ["studentos.coursework","Coursework Studio",true],
    ["studentos.twin","Twin AI",true],
    ["studentos.marketplace","Marketplace",true],
    ["studentos.community","Community",true]
  ];
  for (const [key,name,enabled] of flags) await prisma.featureFlag.upsert({where:{key},update:{name,enabled},create:{key,name,description:name,enabled}});
  await prisma.systemHealthCheck.create({data:{service:"database",status:"READY",detail:"SGCS-1 seed validation"}});
}
main().finally(()=>prisma.$disconnect());
