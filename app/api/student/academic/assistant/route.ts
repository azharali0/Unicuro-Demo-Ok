import { recordApiRequest } from "@/lib/apiDatabase";
import { NextResponse } from "next/server";
import { z } from "zod";
import { requireRole } from "@/lib/session";
import { askAcademicAssistant, checkAiQuota } from "@/lib/aiAcademic";
import { getOrCreateConversation, recordAiMessage, recordTokenLedger } from "@/lib/aiConversationEngine";

const schema = z.object({ question: z.string().min(3).max(2000), conversationId: z.string().optional() });

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/student/academic/assistant", method: "POST", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  const { question, conversationId } = schema.parse(await request.json());
  const conversation = await getOrCreateConversation(user.id, conversationId);
  await recordAiMessage({ conversationId: conversation.id, userId: user.id, role: "user", content: question });

  const result = await askAcademicAssistant(user.id, question);

  if (!result.blocked && result.response) {
    await recordAiMessage({ conversationId: conversation.id, userId: user.id, role: "assistant", content: result.response, model: process.env.AI_MODEL_DEFAULT || "gpt-4o-mini" });
    await recordTokenLedger({ userId: user.id, provider: "openai", model: process.env.AI_MODEL_DEFAULT || "gpt-4o-mini", inputTokens: Math.ceil(question.length / 4), outputTokens: Math.ceil(result.response.length / 4) });
  }

  return NextResponse.json({ ...result, conversationId: conversation.id }, { status: !result.blocked ? 200 : 428 });
}

export async function GET() {
  await recordApiRequest({ endpoint: "/api/student/academic/assistant", method: "GET", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  return NextResponse.json({ ok: true, quota: await checkAiQuota(user.id) });
}
