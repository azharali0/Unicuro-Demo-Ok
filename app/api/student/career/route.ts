import { z } from "zod";
import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { getCareerDashboard,saveCareerDocument,refreshCareerMatches } from "@/lib/careerIntelligenceEngine";
import { ok } from "@/lib/http";
const schema=z.object({documentType:z.string(),title:z.string(),content:z.any()});
export async function GET(){await recordApiRequest({endpoint:"/api/student/career",method:"GET",status:"REQUEST_RECEIVED"});const u=await requireRole(["STUDENT","MERCHANT"]);return ok(await getCareerDashboard(u.id));}
export async function POST(request:Request){await recordApiRequest({endpoint:"/api/student/career",method:"POST",status:"REQUEST_RECEIVED"});const u=await requireRole(["STUDENT","MERCHANT"]);return ok({document:await saveCareerDocument(u.id,schema.parse(await request.json()))},{status:201});}
export async function PATCH(){await recordApiRequest({endpoint:"/api/student/career",method:"PATCH",status:"REQUEST_RECEIVED"});const u=await requireRole(["STUDENT","MERCHANT"]);return ok({matches:await refreshCareerMatches(u.id)});}
