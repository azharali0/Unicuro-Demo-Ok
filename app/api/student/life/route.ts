import { z } from "zod";
import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { listStudentLifeServices,createStudentLifeCase,listStudentLifeCases } from "@/lib/studentLifeEngine";
import { ok } from "@/lib/http";
const schema=z.object({category:z.string(),title:z.string().min(2),description:z.string().min(5),priority:z.string().optional()});
export async function GET(request:Request){await recordApiRequest({endpoint:"/api/student/life",method:"GET",status:"REQUEST_RECEIVED"});const u=await requireRole(["STUDENT","MERCHANT"]);const url=new URL(request.url);return ok({services:await listStudentLifeServices(url.searchParams.get("countryCode")||undefined,url.searchParams.get("category")||undefined),cases:await listStudentLifeCases(u.id)});}
export async function POST(request:Request){await recordApiRequest({endpoint:"/api/student/life",method:"POST",status:"REQUEST_RECEIVED"});const u=await requireRole(["STUDENT","MERCHANT"]);return ok({case:await createStudentLifeCase(u.id,schema.parse(await request.json()))},{status:201});}
