const fs=require("fs");
const required=["lib/stripeProvider.ts","lib/apiSecurity.ts","app/api/billing/checkout/route.ts","app/api/billing/webhook/route.ts","app/api/marketplace/payments/route.ts","app/api/marketplace/refunds/route.ts"];
for(const f of required) console.log(`${fs.existsSync(f)?"PASS":"MISSING"} ${f}`);
