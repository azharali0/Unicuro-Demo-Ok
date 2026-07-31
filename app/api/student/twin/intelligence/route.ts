import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { getTwinDashboard,createTwinActionPlan } from "@/lib/twinAIEngine";
import { ok } from "@/lib/http";
export async function GET(){await recordApiRequest({endpoint:"/api/student/twin/intelligence",method:"GET",status:"REQUEST_RECEIVED"});const u=await requireRole(["STUDENT","MERCHANT"]);return ok(await getTwinDashboard(u.id));}
export async function POST(){await recordApiRequest({endpoint:"/api/student/twin/intelligence",method:"POST",status:"REQUEST_RECEIVED"});const u=await requireRole(["STUDENT","MERCHANT"]);return ok({plan:await createTwinActionPlan(u.id)},{status:201});}
