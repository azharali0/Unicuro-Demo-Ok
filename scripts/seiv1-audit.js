const fs = require("fs");
const required = [
  "lib/courseworkStudioEngine.ts",
  "lib/studentTwinEngine.ts",
  "lib/studentSurvivalEngine.ts",
  "lib/globalStudentIntelligenceEngine.ts",
  "lib/studentWorkspaceEngine.ts",
  "lib/academicIntegrityEngine.ts",
  "lib/providerReadiness.ts",
  "app/student/coursework/page.tsx",
  "app/student/coursework/[workspaceId]/page.tsx",
  "app/student/twin/page.tsx",
  "app/student/life/page.tsx",
  "app/student/workspace/page.tsx",
  "app/student/global/page.tsx",
  "app/api/student/coursework/route.ts",
  "app/api/student/twin/route.ts",
  "app/api/student/budget/route.ts",
  "app/api/student/workspace/documents/route.ts",
  "app/api/student/workspace/boards/route.ts",
  "app/api/admin/studentos-readiness/route.ts",
];
for (const file of required) {
  console.log(`${fs.existsSync(file) ? "PASS" : "MISSING"} ${file}`);
}
