import { z } from "zod";

export const launchItemSchema = z.object({
  area: z.string().min(2),
  title: z.string().min(2),
  status: z.enum(["Passed", "Warning", "Failed", "Not Started"]),
  owner: z.string().min(2),
  evidence: z.string().min(2),
});

export function calculateReadinessScore(items: { status: string }[]) {
  if (!items.length) return 0;
  const points = items.reduce((sum, item) => {
    if (item.status === "Passed" || item.status === "Certified" || item.status === "Compliant") return sum + 100;
    if (item.status === "Warning" || item.status === "Review" || item.status === "scheduled") return sum + 65;
    if (item.status === "Action Needed" || item.status === "Failed") return sum + 20;
    return sum + 0;
  }, 0);

  return Math.round(points / items.length);
}

export function readinessStatus(score: number) {
  if (score >= 85) return "Ready";
  if (score >= 70) return "Watch";
  return "Not Ready";
}
