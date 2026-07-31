import { z } from "zod";
import { requireRole } from "@/lib/session";
export const idSchema = z.string().min(1).max(191);
export const paginationSchema = z.object({ limit: z.coerce.number().int().min(1).max(100).default(20), cursor: z.string().max(191).optional() });
export async function requireStudentAccess(){ return requireRole(["STUDENT","MERCHANT"]); }
export async function requireAdminAccess(){ return requireRole(["ADMIN","SUPER_ADMIN"]); }
export async function requireSuperAdminAccess(){ return requireRole(["SUPER_ADMIN"]); }
