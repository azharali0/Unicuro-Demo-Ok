import { prisma } from "@/lib/prisma";

export async function listStudentLifeServices(countryCode?: string, category?: string) {
  return prisma.studentLifeService.findMany({
    where: {
      active: true,
      ...(category ? { category } : {}),
      ...(countryCode ? { OR: [{ countryCode }, { countryCode: null }] } : {}),
    },
    orderBy: [{ category: "asc" }, { title: "asc" }],
  });
}

export async function createStudentLifeCase(userId: string, data: {
  category: string;
  title: string;
  description: string;
  priority?: string;
}) {
  return prisma.studentLifeCase.create({ data: { userId, ...data } });
}

export async function listStudentLifeCases(userId: string) {
  return prisma.studentLifeCase.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
  });
}
