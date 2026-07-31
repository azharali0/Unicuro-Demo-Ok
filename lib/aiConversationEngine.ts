import { prisma } from "@/lib/prisma";

export async function getOrCreateConversation(userId: string, conversationId?: string) {
  if (conversationId) {
    const existing = await prisma.aiConversation.findFirst({ where: { id: conversationId, userId } });
    if (existing) return existing;
  }
  return prisma.aiConversation.create({ data: { userId, title: "Study conversation" } });
}

export async function recordAiMessage(input: { conversationId: string; userId: string; role: string; content: string; model?: string; tokenCount?: number }) {
  return prisma.aiMessage.create({ data: input });
}

export async function recordTokenLedger(input: { userId: string; provider: string; model: string; inputTokens: number; outputTokens: number; costCents?: number }) {
  return prisma.aiTokenLedger.create({ data: input });
}

export async function listConversations(userId: string) {
  return prisma.aiConversation.findMany({ where: { userId }, include: { messages: { orderBy: { createdAt: "asc" } } }, orderBy: { updatedAt: "desc" } });
}
