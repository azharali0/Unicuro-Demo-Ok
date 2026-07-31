import { prisma } from "@/lib/prisma";
import { callOpenAI } from "@/lib/openAIProvider";
import { evaluateAcademicIntegrityPrompt } from "@/lib/academicIntegrityEngine";

export async function runAcademicTool(userId: string, input: {
  tool: "EXPLAIN" | "OUTLINE" | "REVISION" | "CITATION" | "FLASHCARDS" | "PRESENTATION";
  prompt: string;
}) {
  const integrity = evaluateAcademicIntegrityPrompt(input.prompt);
  if (integrity.blocked) return { blocked: true, response: integrity.guidance };

  const result = await callOpenAI([
    {
      role: "system",
      content: `You are UniCuro Academic Assistant. Tool: ${input.tool}. Help the student learn and structure their own work. Never create assessed submission-ready work.`,
    },
    { role: "user", content: input.prompt },
  ]);
  const content = result.choices?.[0]?.message?.content || "";

  const conversation = await prisma.aiConversation.create({
    data: { userId, title: `${input.tool}: ${input.prompt.slice(0, 80)}` },
  });
  await prisma.aiMessage.createMany({
    data: [
      { userId, conversationId: conversation.id, role: "USER", content: input.prompt },
      { userId, conversationId: conversation.id, role: "ASSISTANT", content },
    ],
  });

  return { blocked: false, conversationId: conversation.id, response: content };
}
