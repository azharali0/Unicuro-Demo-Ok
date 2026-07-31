export type UniCuroRole = "STUDENT" | "MERCHANT" | "ADMIN" | "SUPER_ADMIN";

export const roleHome: Record<UniCuroRole, string> = {
  STUDENT: "/student",
  MERCHANT: "/student/merchant",
  ADMIN: "/admin",
  SUPER_ADMIN: "/super-admin",
};

export const allowedRolePaths: Record<UniCuroRole, string[]> = {
  STUDENT: ["/student"],
  MERCHANT: ["/student", "/student/merchant"],
  ADMIN: ["/admin"],
  SUPER_ADMIN: ["/super-admin"],
};

export function canAccessPath(role: UniCuroRole, pathname: string) {
  return allowedRolePaths[role].some((prefix) => pathname.startsWith(prefix));
}
