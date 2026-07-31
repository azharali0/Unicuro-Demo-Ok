const fs=require("fs");
const required=[
"lib/operations/types.ts","lib/operations/context.ts","lib/operations/trace.ts",
"lib/operations/outbox.ts","lib/operations/queue.ts","lib/operations/engineRegistry.ts",
"workers/domain-worker.ts","tests/operations/context.test.ts",
"tests/operations/engineRegistry.test.ts","app/admin/operations/page.tsx"
];
for(const f of required) console.log(`${fs.existsSync(f)?"PASS":"MISSING"} ${f}`);
