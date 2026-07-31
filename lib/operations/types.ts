export type OperationStage =
  | "UI_EVENT"
  | "API_VALIDATION"
  | "SERVICE"
  | "DATABASE_TRANSACTION"
  | "QUEUE"
  | "WORKER"
  | "ENGINE"
  | "OBSERVABLE_RESULT";

export type OperationStatus = "STARTED" | "SUCCEEDED" | "FAILED";

export type DomainEventEnvelope<TPayload = unknown> = {
  id: string;
  aggregateType: string;
  aggregateId: string;
  eventType: string;
  payload: TPayload;
  occurredAt: string;
};

export type OperationContext = {
  correlationId: string;
  userId?: string;
  operation: string;
};
