import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { prisma } from "@/lib/prisma";
import { ok } from "@/lib/http";
export async function GET(){await recordApiRequest({endpoint:"/api/admin/security/runtime",method:"GET",status:"REQUEST_RECEIVED"});await requireRole(["ADMIN","SUPER_ADMIN"]);const [users,mfa,audits]=await Promise.all([prisma.userAccount.count(),prisma.userAccount.count({where:{mfaEnabled:true}}),prisma.apiRequestAudit.findMany({orderBy:{createdAt:"desc"},take:100})]);return ok({users,mfaEnabledUsers:mfa,audits});}
