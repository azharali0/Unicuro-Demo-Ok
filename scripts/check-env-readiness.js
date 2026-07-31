const required = ["NEXT_PUBLIC_APP_URL","DATABASE_URL","AUTH_SECRET","OTP_HASH_SECRET","STRIPE_SECRET_KEY","STRIPE_WEBHOOK_SECRET","NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY","RESEND_API_KEY","OPENAI_API_KEY"];
const missing = required.filter(k => !process.env[k] || /CONFIGURE|REPLACE|GENERATE/i.test(process.env[k]));
if (missing.length) {
  console.error("Missing or unconfigured env values:");
  for (const k of missing) console.error("- " + k);
  process.exit(1);
}
console.log("Environment readiness check passed.");
