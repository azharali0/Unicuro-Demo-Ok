import { prisma } from "@/lib/prisma";
import { callOpenAI } from "@/lib/openAIProvider";

export async function getAiProfile(userId: string) {
  return prisma.aiAssistantProfile.upsert({
    where: { userId },
    update: {},
    create: { userId },
  });
}

export async function createStudyPlan(userId: string, objective: string) {
  const profile = await getAiProfile(userId);
  if (profile.usedToday >= profile.dailyLimit) throw new Error("AI_DAILY_LIMIT_REACHED");

  const result = await callOpenAI([
    { role: "system", content: "Create a practical student study plan. Return valid JSON with title and actions." },
    { role: "user", content: objective },
  ]);

  const raw = result.choices?.[0]?.message?.content || "{}";
  let parsed: any;
  try { parsed = JSON.parse(raw); } catch { parsed = { title: "Study plan", actions: [raw] }; }

  const plan = await prisma.aiStudyPlan.create({
    data: {
      userId,
      title: parsed.title || "Study plan",
      objective,
      plan: parsed.actions || parsed,
    },
  });

  await prisma.aiAssistantProfile.update({
    where: { userId },
    data: { usedToday: { increment: 1 } },
  });

  return plan;
}
