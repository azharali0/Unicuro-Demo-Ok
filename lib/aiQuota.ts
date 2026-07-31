import { prisma } from "@/lib/prisma";
import { todayKey } from "@/lib/date";

export async function getAiQuota(userId: string) {
  const dateKey = todayKey();
  const limit = Number(process.env.AI_MAX_REQUESTS_PER_USER_PER_DAY || 25);
  const used = await prisma.aiUsageEvent.count({ where: { userId, dateKey, status: "SUCCESS" } });
  return { userId, dateKey, used, limit, remaining: Math.max(0, limit - used), allowed: used < limit };
}

export async function recordAiUsage(input: {
  userId: string;
  prompt: string;
  response?: string;
  model: string;
  status: "SUCCESS" | "FAILED" | "BLOCKED";
}) {
  return prisma.aiUsageEvent.create({
    data: {
      userId: input.userId,
      dateKey: todayKey(),
      promptChars: input.prompt.length,
      responseChars: input.response?.length || 0,
      model: input.model,
      status: input.status,
    },
  });
}
