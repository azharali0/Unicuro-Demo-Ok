import { prisma } from "@/lib/prisma";
import { createDomainEvent } from "@/lib/operations/outbox";
import type { OperationContext } from "@/lib/operations/types";
import { traceStage } from "@/lib/operations/trace";

export type UpdateCareerProfileInput = {
  targetRole?: string;
  skills?: string[];
  cvUrl?: string;
};

export async function updateCareerProfileOperation(
  context: OperationContext,
  userId: string,
  input: UpdateCareerProfileInput
) {
  return traceStage(context, "DATABASE_TRANSACTION", () =>
    prisma.$transaction(async (tx) => {
      const profile = await tx.studentCareerProfile.upsert({
        where: { userId },
        update: input,
        create: { userId, skills: input.skills ?? [], targetRole: input.targetRole, cvUrl: input.cvUrl },
      });
      const event = await createDomainEvent(tx, {
        aggregateType: "StudentCareerProfile",
        aggregateId: profile.id,
        eventType: "career.profile.updated",
        payload: { userId },
      });
      return { profile, eventId: event.id };
    })
  );
}
