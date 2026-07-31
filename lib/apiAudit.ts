import { recordApiRequest } from "@/lib/apiDatabase";

export async function writeApiAudit(input: {
  userId?: string;
  route: string;
  action: string;
  entityType?: string;
  entityId?: string;
  status: string;
  metadata?: any;
}) {
  await recordApiRequest({
    endpoint: input.route,
    method: input.action,
    userId: input.userId,
    status: input.status,
    metadata: {
      entityType: input.entityType,
      entityId: input.entityId,
      ...(input.metadata || {}),
    },
  });
}
