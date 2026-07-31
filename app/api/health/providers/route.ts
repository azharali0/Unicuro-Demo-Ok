import { requireRole } from "@/lib/session";
export const dynamic = "force-dynamic";
export async function GET() {
  await requireRole(["ADMIN", "SUPER_ADMIN"]);
  const configured = (keys: string[]) => keys.every((key) => Boolean(process.env[key]));
  return Response.json({
    providers: {
      stripe: configured(["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET"]),
      resend: configured(["RESEND_API_KEY", "EMAIL_FROM"]),
      twilio: configured(["TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN", "TWILIO_FROM_NUMBER"]),
      webPush: configured(["VAPID_SUBJECT", "NEXT_PUBLIC_VAPID_PUBLIC_KEY", "VAPID_PRIVATE_KEY"]),
      openAI: configured(["OPENAI_API_KEY"]),
    },
  });
}
