const required = [
  "DATABASE_URL", "REDIS_URL", "SESSION_SECRET", "APP_URL",
  "STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET",
  "RESEND_API_KEY", "EMAIL_FROM",
  "TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN", "TWILIO_FROM_NUMBER",
  "VAPID_SUBJECT", "NEXT_PUBLIC_VAPID_PUBLIC_KEY", "VAPID_PRIVATE_KEY",
  "OPENAI_API_KEY"
];
const missing = required.filter((key) => !process.env[key]);
if (missing.length) {
  console.error(`Missing production environment variables: ${missing.join(", ")}`);
  process.exit(1);
}
if ((process.env.SESSION_SECRET || "").length < 32) {
  console.error("SESSION_SECRET must be at least 32 characters");
  process.exit(1);
}
console.log("Production environment contract passed.");
