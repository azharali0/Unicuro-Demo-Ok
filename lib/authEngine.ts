import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const CODE_TTL_MINUTES = 10;

export async function registerUser(input: { email: string; password: string; role: "STUDENT" | "ADMIN" | "SUPER_ADMIN" | "MERCHANT"; phoneNumber?: string }) {
  const email = input.email.trim().toLowerCase();
  const existing = await prisma.userAccount.findUnique({ where: { email } });
  if (existing) throw new Error("EMAIL_ALREADY_REGISTERED");
  const passwordHash = await bcrypt.hash(input.password, 12);
  const user = await prisma.userAccount.create({ data: { email, passwordHash, role: input.role, phoneNumber: input.phoneNumber } });
  await prisma.studentProfile.upsert({ where: { userId: user.id }, update: {}, create: { userId: user.id } });
  return user;
}

export async function authenticatePassword(emailRaw: string, password: string) {
  const email = emailRaw.trim().toLowerCase();
  const user = await prisma.userAccount.findUnique({ where: { email } });
  if (!user || !user.passwordHash || user.status !== "ACTIVE") throw new Error("INVALID_CREDENTIALS");
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new Error("INVALID_CREDENTIALS");
  return user;
}

export async function createAuthCode(userId: string, purpose: string) {
  const code = String(crypto.randomInt(100000, 999999));
  const codeHash = await bcrypt.hash(code, 10);
  const expiresAt = new Date(Date.now() + CODE_TTL_MINUTES * 60_000);
  await prisma.authCode.create({ data: { userId, purpose, codeHash, expiresAt } });
  return { code, expiresAt };
}

export async function verifyAuthCode(userId: string, purpose: string, code: string) {
  const rows = await prisma.authCode.findMany({
    where: { userId, purpose, consumedAt: null, expiresAt: { gt: new Date() } },
    orderBy: { createdAt: "desc" },
    take: 5,
  });
  for (const row of rows) {
    if (await bcrypt.compare(code, row.codeHash)) {
      await prisma.authCode.update({ where: { id: row.id }, data: { consumedAt: new Date() } });
      return true;
    }
  }
  return false;
}
