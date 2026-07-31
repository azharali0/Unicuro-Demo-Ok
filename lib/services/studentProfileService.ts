import { prisma } from "@/lib/prisma";
import { createDomainEvent } from "@/lib/operations/outbox";
import type { OperationContext } from "@/lib/operations/types";
import { traceStage } from "@/lib/operations/trace";

export type UpdateStudentProfileInput = {
  course?: string;
  preferredLanguage?: string;
  preferredCurrency?: string;
  internationalStudent?: boolean;
  timezone?: string;
};

export async function updateStudentProfileOperation(
  context: OperationContext,
  userId: string,
  input: UpdateStudentProfileInput
) {
  return traceStage(context, "DATABASE_TRANSACTION", () =>
    prisma.$transaction(async (tx) => {
      const profile = await tx.studentProfile.upsert({
        where: { userId },
        update: input,
        create: { userId, ...input },
      });
      const event = await createDomainEvent(tx, {
        aggregateType: "StudentProfile",
        aggregateId: profile.id,
        eventType: "student.profile.updated",
        payload: { userId, ...input },
      });
      return { profile, eventId: event.id };
    })
  );
}
