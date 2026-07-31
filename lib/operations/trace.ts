import { prisma } from "@/lib/prisma";
import type { OperationContext, OperationStage, OperationStatus } from "@/lib/operations/types";

export async function recordOperationTrace(
  context: OperationContext,
  stage: OperationStage,
  status: OperationStatus,
  detail?: unknown,
  durationMs?: number
) {
  return prisma.operationTrace.create({
    data: {
      correlationId: context.correlationId,
      userId: context.userId,
      operation: context.operation,
      stage,
      status,
      detail: detail as any,
      durationMs,
    },
  });
}

export async function traceStage<T>(
  context: OperationContext,
  stage: OperationStage,
  action: () => Promise<T>,
  detail?: unknown
): Promise<T> {
  const started = Date.now();
  await recordOperationTrace(context, stage, "STARTED", detail);
  try {
    const result = await action();
    await recordOperationTrace(context, stage, "SUCCEEDED", undefined, Date.now() - started);
    return result;
  } catch (error: any) {
    await recordOperationTrace(
      context,
      stage,
      "FAILED",
      { message: String(error?.message || error) },
      Date.now() - started
    );
    throw error;
  }
}
