import { prisma } from "@/lib/prisma";

export async function listCoursework(userId: string) {
  return prisma.courseworkWorkspace.findMany({
    where: { userId },
    include: { outline: true, milestones: { orderBy: { sortOrder: "asc" } }, sources: true },
    orderBy: { updatedAt: "desc" },
  });
}

export async function createCoursework(userId: string, data: {
  title: string;
  courseName?: string;
  assignmentType: string;
  briefText: string;
  deadlineAt?: Date;
  wordTarget?: number;
}) {
  return prisma.courseworkWorkspace.create({
    data: { userId, ...data },
  });
}

export async function generateCourseworkPlan(userId: string, workspaceId: string) {
  const workspace = await prisma.courseworkWorkspace.findFirst({ where: { id: workspaceId, userId } });
  if (!workspace) throw new Error("COURSEWORK_NOT_FOUND");

  const sections = [
    { title: "Understand the brief", purpose: "Identify the task, command words and marking expectations." },
    { title: "Research", purpose: "Collect reliable sources and organise evidence." },
    { title: "Argument and structure", purpose: "Build a clear thesis and section plan." },
    { title: "Draft", purpose: "Write in your own words using the approved outline." },
    { title: "Review", purpose: "Check logic, citations, grammar and academic integrity." },
    { title: "Submit", purpose: "Complete the final submission checklist." },
  ];

  return prisma.courseworkOutline.upsert({
    where: { workspaceId },
    update: { sections },
    create: { workspaceId, sections },
  });
}

export async function addCourseworkMilestone(userId: string, workspaceId: string, data: { title: string; dueAt?: Date; sortOrder?: number }) {
  const exists = await prisma.courseworkWorkspace.findFirst({ where: { id: workspaceId, userId } });
  if (!exists) throw new Error("COURSEWORK_NOT_FOUND");
  return prisma.courseworkMilestone.create({ data: { workspaceId, ...data } });
}
