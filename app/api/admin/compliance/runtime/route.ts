import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { prisma } from "@/lib/prisma";
import { ok } from "@/lib/http";
export async function GET(){await recordApiRequest({endpoint:"/api/admin/compliance/runtime",method:"GET",status:"REQUEST_RECEIVED"});await requireRole(["ADMIN","SUPER_ADMIN"]);const [tickets,email,sms]=await Promise.all([prisma.supportTicket.count(),prisma.emailDelivery.findMany({orderBy:{createdAt:"desc"},take:100}),prisma.smsDelivery.findMany({orderBy:{createdAt:"desc"},take:100})]);return ok({supportTickets:tickets,emailDeliveries:email,smsDeliveries:sms});}
