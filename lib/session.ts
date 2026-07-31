import { cookies } from "next/headers";
import { UniCuroRole } from "./access-control";

const VALID_ROLES: UniCuroRole[] = ["STUDENT", "MERCHANT", "ADMIN", "SUPER_ADMIN"];

export async function getUniCuroSession() {
  const store = await cookies();
  const roleValue = store.get("unicuro_role")?.value;
  const userId = store.get("unicuro_user_id")?.value;
  const email = store.get("unicuro_email")?.value;

  if (!roleValue || !VALID_ROLES.includes(roleValue as UniCuroRole) || !userId || !email) {
    return null;
  }

  return {
    id: userId,
    email,
    role: roleValue as UniCuroRole,
    mfaVerified: store.get("unicuro_mfa")?.value === "true",
  };
}

export async function requireRole(roles: UniCuroRole[]) {
  const session = await getUniCuroSession();
  if (!session || !roles.includes(session.role)) {
    throw new Error("UNAUTHORIZED_ROLE");
  }
  return session;
}
