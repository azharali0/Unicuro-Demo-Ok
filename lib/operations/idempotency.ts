import crypto from "crypto";
import { prisma } from "@/lib/prisma";

function hash(input: unknown) {
  return crypto.createHash("sha256").update(JSON.stringify(input)).digest("hex");
}

export async function beginIdempotentOperation(
  key: string,
  operation: string,
  request: unknown
) {
  const requestHash = hash(request);
  const existing = await prisma.idempotencyRecord.findUnique({ where: { key } });

  if (existing) {
    if (existing.requestHash !== requestHash) throw new Error("IDEMPOTENCY_KEY_REUSED");
    return { record: existing, replay: existing.status === "COMPLETED" };
  }

  const record = await prisma.idempotencyRecord.create({
    data: {
      key,
      operation,
      requestHash,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  });
  return { record, replay: false };
}

export async function completeIdempotentOperation(key: string, response: unknown) {
  return prisma.idempotencyRecord.update({
    where: { key },
    data: { status: "COMPLETED", response: response as any },
  });
}
