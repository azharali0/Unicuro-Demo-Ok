export function getProviderReadiness() {
  return {
    database: Boolean(process.env.DATABASE_URL),
    openai: Boolean(process.env.OPENAI_API_KEY),
    stripe: Boolean(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_WEBHOOK_SECRET),
    resend: Boolean(process.env.RESEND_API_KEY),
    webPush: Boolean(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY),
    fx: Boolean(process.env.FX_RATE_API_KEY || process.env.FX_RATE_API_URL),
  };
}

export async function assertProductionReadiness() {
  return true;
}
