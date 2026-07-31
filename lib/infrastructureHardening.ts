import { z } from "zod";

export const healthCheckSchema = z.object({
  service: z.string().min(2),
  status: z.enum(["Healthy", "Degraded", "Down"]),
  latencyMs: z.number().min(0),
  region: z.string().min(2),
});

export const backupJobSchema = z.object({
  target: z.enum(["Database", "Object Storage", "Logs", "Configuration"]),
  status: z.enum(["Scheduled", "Running", "Completed", "Failed"]),
  region: z.string().min(2),
});

export const incidentRecordSchema = z.object({
  title: z.string().min(2),
  severity: z.enum(["Low", "Medium", "High", "Critical"]),
  service: z.string().min(2),
  summary: z.string().min(2),
});

export const featureFlagSchema = z.object({
  key: z.string().min(2),
  description: z.string().min(2),
  enabled: z.boolean(),
  rolloutPercent: z.number().min(0).max(100),
});

export function serviceSloStatus(uptimePercent: number) {
  if (uptimePercent >= 99.9) return "Healthy";
  if (uptimePercent >= 99.5) return "Watch";
  return "Action";
}

export function capacityStatus(utilisationPercent: number) {
  if (utilisationPercent >= 85) return "Scale Required";
  if (utilisationPercent >= 70) return "Watch";
  return "Healthy";
}

export function backupStatus(lastBackupHoursAgo: number) {
  if (lastBackupHoursAgo <= 24) return "Protected";
  if (lastBackupHoursAgo <= 48) return "Watch";
  return "At Risk";
}

export function rtoRpoScore(rtoMinutes: number, rpoMinutes: number) {
  let score = 100;
  if (rtoMinutes > 60) score -= 20;
  if (rtoMinutes > 240) score -= 25;
  if (rpoMinutes > 60) score -= 20;
  if (rpoMinutes > 240) score -= 25;
  return Math.max(score, 0);
}
