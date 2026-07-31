import Stripe from "stripe";
import { getSessionUser } from "./auth";

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" as any })
  : null;

export async function assertPremiumAccess() {
  const user = await getSessionUser();
  return {
    allowed: user?.subscriptionTier === "PREMIUM",
    tier: user?.subscriptionTier || "FREE",
    upgradeRequired: user?.subscriptionTier !== "PREMIUM",
  };
}
