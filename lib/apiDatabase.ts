import { prisma } from "@/lib/prisma";

export async function recordApiRequest(input: {
  endpoint: string;
  method: string;
  userId?: string;
  status?: string;
  durationMs?: number;
  metadata?: any;
}) {
  try {
    await prisma.apiRequestAudit.create({
      data: {
        endpoint: input.endpoint,
        method: input.method,
        userId: input.userId,
        status: input.status || "REQUEST_RECEIVED",
        durationMs: input.durationMs,
        metadata: input.metadata || {},
      },
    });
  } catch {
    // Request audit failure must never break the API response.
  }
}

export async function recordReadinessCheck(input: {
  category: string;
  name: string;
  status: string;
  detail?: string;
}) {
  try {
    await prisma.systemReadinessCheck.create({ data: input });
  } catch {
    // Readiness logging failure must not break diagnostics.
  }
}
