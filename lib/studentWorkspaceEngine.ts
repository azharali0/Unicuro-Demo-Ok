import { prisma } from "@/lib/prisma";

export async function listWorkspaceDocuments(userId: string) {
  return prisma.studentWorkspaceDocument.findMany({ where: { userId, status: "ACTIVE" }, orderBy: { updatedAt: "desc" } });
}

export async function createWorkspaceDocument(userId: string, data: { title: string; documentType: string; content: any; workspaceId?: string }) {
  return prisma.studentWorkspaceDocument.create({ data: { userId, ...data } });
}

export async function listWorkspaceBoards(userId: string) {
  return prisma.studentWorkspaceBoard.findMany({ where: { userId }, orderBy: { updatedAt: "desc" } });
}

export async function createWorkspaceBoard(userId: string, data: { title: string; boardType: string; content: any }) {
  return prisma.studentWorkspaceBoard.create({ data: { userId, ...data } });
}
