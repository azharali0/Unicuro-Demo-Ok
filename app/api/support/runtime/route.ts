import { z } from "zod";
import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { prisma } from "@/lib/prisma";
import { ok } from "@/lib/http";
const schema=z.object({subject:z.string().min(2),category:z.string().min(2),description:z.string().min(5),priority:z.string().optional()});
export async function GET(){await recordApiRequest({endpoint:"/api/support/runtime",method:"GET",status:"REQUEST_RECEIVED"});const u=await requireRole(["STUDENT","MERCHANT","ADMIN","SUPER_ADMIN"]);return ok({tickets:await prisma.supportTicket.findMany({where:{userId:u.id},include:{messages:true},orderBy:{updatedAt:"desc"}})});}
export async function POST(request:Request){await recordApiRequest({endpoint:"/api/support/runtime",method:"POST",status:"REQUEST_RECEIVED"});const u=await requireRole(["STUDENT","MERCHANT","ADMIN","SUPER_ADMIN"]);return ok({ticket:await prisma.supportTicket.create({data:{userId:u.id,...schema.parse(await request.json())}})},{status:201});}
