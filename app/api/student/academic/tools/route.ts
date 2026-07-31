import { z } from "zod";
import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { runAcademicTool } from "@/lib/academicAssistantEngine";
import { ok } from "@/lib/http";
const schema=z.object({tool:z.enum(["EXPLAIN","OUTLINE","REVISION","CITATION","FLASHCARDS","PRESENTATION"]),prompt:z.string().min(2)});
export async function POST(request:Request){await recordApiRequest({endpoint:"/api/student/academic/tools",method:"POST",status:"REQUEST_RECEIVED"});const u=await requireRole(["STUDENT","MERCHANT"]);return ok(await runAcademicTool(u.id,schema.parse(await request.json())));}
