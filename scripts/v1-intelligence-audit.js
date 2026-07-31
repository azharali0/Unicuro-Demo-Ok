const fs=require("fs");
const required=[
"lib/aiSystemsEngine.ts","lib/studentLifeEngine.ts","lib/notificationIntelligenceEngine.ts",
"lib/careerIntelligenceEngine.ts","lib/marketplaceIntelligenceEngine.ts",
"lib/academicAssistantEngine.ts","lib/twinAIEngine.ts",
"app/api/student/ai/study-plan/route.ts","app/api/student/life/route.ts",
"app/api/student/notifications/dispatch/route.ts","app/api/student/career/route.ts",
"app/api/student/marketplace/intelligence/route.ts","app/api/student/academic/tools/route.ts",
"app/api/student/twin/intelligence/route.ts"
];
for(const f of required) console.log(`${fs.existsSync(f)?"PASS":"MISSING"} ${f}`);
