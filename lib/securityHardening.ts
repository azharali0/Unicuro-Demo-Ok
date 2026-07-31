import { z } from "zod";
import { createHash, randomBytes, timingSafeEqual } from "crypto";

type SecurityRole = "STUDENT" | "MERCHANT" | "ADMIN" | "SUPER_ADMIN";


export const privilegedRoles: SecurityRole[] = ["ADMIN", "SUPER_ADMIN"];

export const securityEventSchema = z.object({
  actorId: z.string().optional(),
  type: z.string().min(2),
  severity: z.enum(["Low", "Medium", "High", "Critical"]),
  source: z.string().min(2),
  ip: z.string().optional(),
  userAgent: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const mfaChallengeSchema = z.object({
  userId: z.string().min(1),
  code: z.string().min(6).max(10),
  action: z.string().min(2).optional(),
});

export const privilegedActionSchema = z.object({
  actorId: z.string().min(1),
  action: z.string().min(2),
  resource: z.string().min(2),
  reason: z.string().min(4),
});

export function hashSecurityValue(value: string, salt = process.env.AUTH_SECRET ?? "local-dev-secret") {
  return createHash("sha256").update(`${salt}:${value}`).digest("hex");
}

export function generateBackupCode() {
  return randomBytes(6).toString("hex").toUpperCase();
}

export function safeCompare(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function requireMfa(role: SecurityRole, riskScore = 0) {
  if (role === "SUPER_ADMIN" || role === "ADMIN") return true;
  return riskScore >= 70;
}

export function calculateThreatScore(input: {
  failedLogins?: number;
  ipRisk?: "Low" | "Medium" | "High";
  deviceKnown?: boolean;
  impossibleTravel?: boolean;
  apiBurst?: boolean;
}) {
  let score = 0;
  score += Math.min((input.failedLogins ?? 0) * 12, 48);
  if (input.ipRisk === "Medium") score += 20;
  if (input.ipRisk === "High") score += 40;
  if (input.deviceKnown === false) score += 15;
  if (input.impossibleTravel) score += 30;
  if (input.apiBurst) score += 25;
  return Math.min(score, 100);
}

export function threatLevel(score: number) {
  if (score >= 85) return "Critical";
  if (score >= 65) return "High";
  if (score >= 35) return "Medium";
  return "Low";
}

export function securityHeaders() {
  return {
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(self), microphone=(), geolocation=(self)",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Resource-Policy": "same-origin",
  };
}
