const fs=require("fs"),path=require("path");
const required=["prisma/schema.prisma","lib/prisma.ts","middleware.ts","lib/access-control.ts","lib/homepageService.ts","app/page.tsx","lib/engineRegistry.ts"];
for(const f of required) console.log(`${fs.existsSync(path.join(process.cwd(),f))?"PASS":"MISSING"} ${f}`);
