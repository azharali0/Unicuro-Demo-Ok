import { cookies } from "next/headers";
import { UniCuroRole } from "./roles";

export type SessionUser = {
  id: string;
  email: string;
  role: UniCuroRole;
  mfaVerified?: boolean;
  subscriptionTier?: "FREE" | "PREMIUM";
};

export async function getSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const role = (cookieStore.get("unicuro_role")?.value || "STUDENT") as UniCuroRole;
  return {
    id: cookieStore.get("unicuro_user_id")?.value || "session-user",
    email: cookieStore.get("unicuro_email")?.value || "session-user@account",
    role,
    mfaVerified: cookieStore.get("unicuro_mfa")?.value === "true",
    subscriptionTier: (cookieStore.get("unicuro_tier")?.value || "FREE") as "FREE" | "PREMIUM",
  };
}

export async function requireRole(roles: UniCuroRole[]) {
  const user = await getSessionUser();
  if (!user || !roles.includes(user.role)) throw new Error("UNAUTHORIZED_ROLE");
  return user;
}

export function hasPremium(user: SessionUser | null) {
  return user?.subscriptionTier === "PREMIUM";
}
