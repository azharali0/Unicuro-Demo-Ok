import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/emailProvider";
import { sendPush } from "@/lib/pushProvider";
import { sendSms } from "@/lib/smsProvider";
import { createTwinActionPlan } from "@/lib/twinAIEngine";
import { refreshCareerMatches } from "@/lib/careerIntelligenceEngine";
import { refreshMarketplaceRecommendations } from "@/lib/marketplaceIntelligenceEngine";

export async function executeDomainEngine(eventType: string, payload: any) {
  switch (eventType) {
    case "student.profile.updated": {
      const profile = await prisma.studentProfile.findUnique({ where: { userId: payload.userId } });
      return prisma.globalSearchDocument.upsert({
        where: { id: `student:${payload.userId}` },
        update: {
          title: "Student profile",
          summary: profile?.course || "Student profile",
          route: "/student/settings",
          searchText: [profile?.course, profile?.preferredLanguage, profile?.preferredCurrency].filter(Boolean).join(" "),
        },
        create: {
          id: `student:${payload.userId}`,
          entityType: "STUDENT_PROFILE",
          entityId: payload.userId,
          userId: payload.userId,
          title: "Student profile",
          summary: profile?.course || "Student profile",
          route: "/student/settings",
          visibility: "PRIVATE",
          searchText: [profile?.course, profile?.preferredLanguage, profile?.preferredCurrency].filter(Boolean).join(" "),
        },
      });
    }
    case "coursework.created":
      return createTwinActionPlan(payload.userId);
    case "career.profile.updated":
      return refreshCareerMatches(payload.userId);
    case "marketplace.listing.created":
      return refreshMarketplaceRecommendations(payload.userId);
    case "notification.requested":
      if (payload.channel === "EMAIL") return sendEmail(payload.message);
      if (payload.channel === "SMS") return sendSms(payload.message);
      if (payload.channel === "PUSH") return sendPush(payload.userId, payload.message);
      return prisma.notification.create({
        data: {
          userId: payload.userId,
          title: String(payload.message.title || "Notification"),
          body: String(payload.message.body || ""),
          category: String(payload.message.category || "SYSTEM"),
          read: false,
          actionUrl: payload.message.actionUrl ? String(payload.message.actionUrl) : null,
        },
      });
    default:
      return { ignored: true, eventType };
  }
}
