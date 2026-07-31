import { prisma } from "@/lib/prisma";

export async function getPublishedHomepage() {
  const homepage = await prisma.homepageContent.findFirst({
    where: { status: "PUBLISHED" },
    include: { sections: { where: { active: true }, orderBy: { sortOrder: "asc" } } },
    orderBy: { updatedAt: "desc" },
  });

  const metrics = await prisma.homepageMetric.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });

  return { homepage, metrics, ready: Boolean(homepage) };
}
