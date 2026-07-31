import { z } from "zod";
import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { prisma } from "@/lib/prisma";
import { ok } from "@/lib/http";
const schema=z.object({title:z.string().min(2),body:z.string().min(2),categoryId:z.string()});
export async function GET(){await recordApiRequest({endpoint:"/api/community/runtime",method:"GET",status:"REQUEST_RECEIVED"});await requireRole(["STUDENT","MERCHANT"]);return ok({posts:await prisma.communityPost.findMany({orderBy:{createdAt:"desc"}})});}
export async function POST(request:Request){await recordApiRequest({endpoint:"/api/community/runtime",method:"POST",status:"REQUEST_RECEIVED"});const u=await requireRole(["STUDENT","MERCHANT"]);return ok({post:await prisma.communityPost.create({data:{authorId:u.id,...schema.parse(await request.json())}})},{status:201});}
