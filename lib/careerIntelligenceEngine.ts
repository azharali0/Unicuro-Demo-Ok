import { prisma } from "@/lib/prisma";

export async function getCareerDashboard(userId: string) {
  const [profile, opportunities, documents, matches] = await Promise.all([
    prisma.studentCareerProfile.upsert({ where: { userId }, update: {}, create: { userId } }),
    prisma.studentOpportunity.findMany({ where: { active: true }, orderBy: { createdAt: "desc" } }),
    prisma.careerDocument.findMany({ where: { userId, status: "ACTIVE" }, orderBy: { updatedAt: "desc" } }),
    prisma.careerOpportunityMatch.findMany({ where: { userId }, orderBy: { score: "desc" } }),
  ]);
  return { profile, opportunities, documents, matches };
}

export async function saveCareerDocument(userId: string, data: { documentType: string; title: string; content: any }) {
  return prisma.careerDocument.create({ data: { userId, ...data } });
}

export async function refreshCareerMatches(userId: string) {
  const profile = await prisma.studentCareerProfile.findUnique({ where: { userId } });
  const opportunities = await prisma.studentOpportunity.findMany({ where: { active: true } });
  const results = [];
  for (const opportunity of opportunities) {
    let score = 50;
    const reasons = [];
    if (profile?.targetRole && opportunity.title.toLowerCase().includes(profile.targetRole.toLowerCase())) {
      score += 35;
      reasons.push("Target role match");
    }

    results.push(await prisma.careerOpportunityMatch.upsert({
      where: { userId_opportunityId: { userId, opportunityId: opportunity.id } },
      update: { score, reasons },
      create: { userId, opportunityId: opportunity.id, score, reasons },
    }));
  }
  return results;
}
