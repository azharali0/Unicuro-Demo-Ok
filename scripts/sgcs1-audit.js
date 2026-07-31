const fs=require("fs");
const required=[
"app/search/page.tsx","app/api/search/route.ts","app/api/media/route.ts","app/admin/content/page.tsx",
"app/student/planner/page.tsx","app/student/wallet/page.tsx","app/student/opportunities/page.tsx","app/student/scholarships/page.tsx",
"app/student/marketplace/page.tsx","app/student/wellbeing/page.tsx","app/student/career/page.tsx",
"app/student/saved/page.tsx","app/support/page.tsx","app/admin/users/page.tsx","app/admin/feature-flags/page.tsx",
"app/admin/audit/page.tsx","app/admin/monitoring/page.tsx","app/admin/jobs/page.tsx"
];
for(const f of required) console.log(`${fs.existsSync(f)?"PASS":"MISSING"} ${f}`);
