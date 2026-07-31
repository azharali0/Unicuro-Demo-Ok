const fs = require("fs");
const path = require("path");
const root = process.cwd();

const required = [
  "prisma/schema.prisma",
  "lib/prisma.ts",
  "lib/access-control.ts",
  "middleware.ts",
  "lib/homepageService.ts",
  "app/api/homepage/route.ts",
  "lib/dynamicPricing.ts",
  "lib/studentEnginesDb.ts",
  "lib/engineRegistry.ts",
];

for (const file of required) {
  console.log(`${fs.existsSync(path.join(root, file)) ? "PASS" : "MISSING"} ${file}`);
}
