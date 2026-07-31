const fs=require("fs");
const required=[
"lib/authEngine.ts","lib/openAIProvider.ts","lib/emailProvider.ts","lib/smsProvider.ts","lib/pushProvider.ts","lib/studentRuntimeEngine.ts",
"app/api/auth/register/route.ts","app/api/auth/login/route.ts","app/api/auth/mfa/request/route.ts","app/api/auth/mfa/verify/route.ts",
"app/api/academic/assistant/route.ts","app/api/student/profile/route.ts","app/api/student/runtime/route.ts",
"app/api/email/send/route.ts","app/api/sms/send/route.ts","app/api/push/send/route.ts",
"app/api/community/runtime/route.ts","app/api/marketplace/runtime/route.ts","app/api/support/runtime/route.ts",
"app/api/admin/security/runtime/route.ts","app/api/admin/compliance/runtime/route.ts"
];
for(const f of required) console.log(`${fs.existsSync(f)?"PASS":"MISSING"} ${f}`);
