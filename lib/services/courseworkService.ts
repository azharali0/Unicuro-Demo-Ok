import { prisma } from "@/lib/prisma";
import { createDomainEvent } from "@/lib/operations/outbox";
import type { OperationContext } from "@/lib/operations/types";
import { traceStage } from "@/lib/operations/trace";

export type CreateCourseworkInput = {
  title: string;
  courseName?: string;
  assignmentType: string;
  briefText: string;
  deadlineAt?: Date;
  wordTarget?: number;
};

export async function createCourseworkOperation(
  context: OperationContext,
  userId: string,
  input: CreateCourseworkInput
) {
  return traceStage(context, "DATABASE_TRANSACTION", () =>
    prisma.$transaction(async (tx) => {
      const coursework = await tx.courseworkWorkspace.create({
        data: { userId, ...input },
      });
      const event = await createDomainEvent(tx, {
        aggregateType: "CourseworkWorkspace",
        aggregateId: coursework.id,
        eventType: "coursework.created",
        payload: { userId, courseworkId: coursework.id },
      });
      return { coursework, eventId: event.id };
    })
  );
}
