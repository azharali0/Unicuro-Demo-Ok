import { createHmac } from "crypto";
import { z } from "zod";

export const paymentEventSchema = z.object({
  provider: z.enum(["Stripe", "Wallet", "Bank", "Partner"]),
  eventId: z.string().min(1),
  amount: z.number(),
  currency: z.string().min(3).max(3),
  type: z.string().min(2),
  userId: z.string().optional(),
});

export const ledgerEntrySchema = z.object({
  walletId: z.string().min(1),
  debitAccount: z.string().min(2),
  creditAccount: z.string().min(2),
  amount: z.number().positive(),
  currency: z.string().min(3).max(3),
  reference: z.string().min(1),
});

export const fraudCaseSchema = z.object({
  userId: z.string().min(1),
  source: z.enum(["Cashback", "Referral", "Marketplace", "Wallet", "Billing", "Payout"]),
  signal: z.string().min(2),
  riskScore: z.number().min(0).max(100),
});

export function verifyWebhookSignature(payload: string, signature: string, secret: string) {
  const expected = createHmac("sha256", secret).update(payload).digest("hex");
  return expected === signature;
}

export function idempotencyKey(provider: string, eventId: string) {
  return `${provider}:${eventId}`;
}

export function fraudSeverity(score: number) {
  if (score >= 90) return "Critical";
  if (score >= 70) return "High";
  if (score >= 40) return "Medium";
  return "Low";
}

export function reconciliationStatus(expected: number, actual: number) {
  const delta = Math.round((actual - expected) * 100) / 100;
  if (delta === 0) return { status: "Matched", delta };
  if (Math.abs(delta) <= 1) return { status: "Tolerance Review", delta };
  return { status: "Mismatch", delta };
}

export function ledgerBalanced(debits: number, credits: number) {
  return Math.round((debits - credits) * 100) === 0;
}
