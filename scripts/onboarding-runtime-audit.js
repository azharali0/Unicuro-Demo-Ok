const fs = require("fs");

const required = [
  "lib/onboardingRuntimeEngine.ts",
  "lib/onboardingGuard.ts",
  "components/onboarding/RuntimeOnboardingShell.tsx",
  "components/onboarding/RuntimeOnboardingForm.tsx",
  "app/api/onboarding/state/route.ts",
  "app/api/onboarding/options/route.ts",
  "app/api/onboarding/step/route.ts",
  "app/onboarding/welcome/page.tsx",
  "app/onboarding/profile/page.tsx",
  "app/onboarding/education/page.tsx",
  "app/onboarding/location/page.tsx",
  "app/onboarding/preferences/page.tsx",
  "app/onboarding/ai/page.tsx",
  "app/onboarding/notifications/page.tsx",
  "app/onboarding/marketplace/page.tsx",
  "app/onboarding/merchant/page.tsx",
  "app/onboarding/complete/page.tsx",
  "prisma/seed-onboarding-runtime.js",
];

for (const file of required) {
  console.log(`${fs.existsSync(file) ? "PASS" : "MISSING"} ${file}`);
}
