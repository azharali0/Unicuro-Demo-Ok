const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const steps = [
["welcome","Welcome","Start your setup.","/onboarding/welcome"],["profile","Profile","Set profile.","/onboarding/profile"],["education","Education","Set education.","/onboarding/education"],["location","Location","Set location.","/onboarding/location"],["preferences","Preferences","Set preferences.","/onboarding/preferences"],["ai","AI","Set AI.","/onboarding/ai"],["notifications","Notifications","Set notifications.","/onboarding/notifications"],["marketplace","Marketplace","Set marketplace.","/onboarding/marketplace"],["merchant","Merchant","Set merchant.","/onboarding/merchant"],["complete","Complete","Finish.","/onboarding/complete"]
];
async function main(){
 const flow=await prisma.onboardingFlow.upsert({where:{code:"student-v1"},update:{active:true},create:{code:"student-v1",name:"Student Onboarding V1",description:"Database-driven onboarding.",role:"STUDENT",active:true}});
 for(let i=0;i<steps.length;i++){const [code,title,description,route]=steps[i]; await prisma.onboardingStep.upsert({where:{flowId_code:{flowId:flow.id,code}},update:{title,description,route,sortOrder:i+1,active:true},create:{flowId:flow.id,code,title,description,route,sortOrder:i+1,active:true}});}
}
main().finally(()=>prisma.$disconnect());
