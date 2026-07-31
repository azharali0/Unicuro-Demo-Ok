import { z } from "zod";
import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { createStudyPlan } from "@/lib/aiSystemsEngine";
import { ok } from "@/lib/http";
const schema=z.object({objective:z.string().min(5)});
export async function POST(request:Request){await recordApiRequest({endpoint:"/api/student/ai/study-plan",method:"POST",status:"REQUEST_RECEIVED"});const u=await requireRole(["STUDENT","MERCHANT"]);return ok({plan:await createStudyPlan(u.id,schema.parse(await request.json()).objective)},{status:201});}
