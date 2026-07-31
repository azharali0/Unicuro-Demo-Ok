import crypto from "crypto";
import type { OperationContext } from "@/lib/operations/types";

export function createOperationContext(
  operation: string,
  userId?: string,
  correlationId?: string
): OperationContext {
  return {
    operation,
    userId,
    correlationId: correlationId || crypto.randomUUID(),
  };
}
