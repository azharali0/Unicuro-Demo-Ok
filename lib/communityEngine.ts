import { prisma } from "@/lib/prisma";

export async function listCommunityCategories() {
  return prisma.communityCategory.findMany({ where: { status: "ACTIVE" }, orderBy: { name: "asc" } });
}

export async function createCommunityCategory(data: { name: string; slug: string; description?: string }) {
  return prisma.communityCategory.upsert({
    where: { slug: data.slug },
    update: data,
    create: data,
  });
}

export async function listCommunityPosts(categorySlug?: string) {
  return prisma.communityForumPost.findMany({
    where: { status: "PUBLISHED", ...(categorySlug ? { category: { slug: categorySlug } } : {}) },
    include: { category: true, replies: true, likes: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function createCommunityPost(authorId: string, data: { categoryId: string; title: string; body: string }) {
  const post = await prisma.communityForumPost.create({ data: { authorId, ...data } });
  await prisma.communityReputation.upsert({
    where: { userId: authorId },
    update: { points: { increment: 5 } },
    create: { userId: authorId, points: 5 },
  });
  return post;
}

export async function createCommunityReply(authorId: string, postId: string, body: string) {
  return prisma.communityReply.create({ data: { authorId, postId, body } });
}

export async function likeCommunityPost(userId: string, postId: string) {
  return prisma.communityLike.upsert({
    where: { postId_userId: { postId, userId } },
    update: {},
    create: { postId, userId },
  });
}

export async function reportCommunityPost(reporterId: string, postId: string, reason: string) {
  return prisma.communityReport.create({ data: { reporterId, postId, reason } });
}
