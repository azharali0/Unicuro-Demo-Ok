import { prisma } from "@/lib/prisma";
import { callOpenAI } from "@/lib/openAIProvider";
import { evaluateAcademicIntegrityPrompt } from "@/lib/academicIntegrityEngine";

export async function askAcademicAssistant(userId: string, prompt: string) {
  const integrity = evaluateAcademicIntegrityPrompt(prompt);
  if (integrity.blocked) {
    return { blocked: true, response: integrity.guidance };
  }

  const quota = await prisma.aiQuota.upsert({
    where: { userId },
    update: {},
    create: { userId, monthlyLimit: 100, used: 0 },
  });
  if (quota.used >= quota.monthlyLimit) throw new Error("AI_QUOTA_EXCEEDED");

  const conversation = await prisma.aiConversation.create({ data: { userId, title: prompt.slice(0, 100) } });
  await prisma.aiMessage.create({ data: { userId, conversationId: conversation.id, role: "USER", content: prompt } });

  const result = await callOpenAI([
    { role: "system", content: "You are UniCuro Academic Assistant. Support learning, explanation, planning, citations and feedback. Do not produce submission-ready assessed work." },
    { role: "user", content: prompt },
  ]);
  const content = result.choices?.[0]?.message?.content || "";
  await prisma.aiMessage.create({ data: { userId, conversationId: conversation.id, role: "ASSISTANT", content } });
  await prisma.aiQuota.update({ where: { userId }, data: { used: { increment: 1 } } });
  return { blocked: false, conversationId: conversation.id, response: content };
}

export async function checkAiQuota(userId: string) {
  return true;
}
