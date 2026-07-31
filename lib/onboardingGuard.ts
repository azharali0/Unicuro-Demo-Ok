import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function requireCompletedOnboarding(userId: string) {
  const profile = await prisma.userOnboardingProfile.findUnique({ where: { userId } });
  if (!profile?.completed) redirect("/onboarding");
  return profile;
}
