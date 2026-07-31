import { z } from "zod";
import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { dispatchNotification } from "@/lib/notificationIntelligenceEngine";
import { ok } from "@/lib/http";
const schema=z.object({userId:z.string(),title:z.string(),body:z.string(),email:z.string().email().optional(),phone:z.string().optional(),channels:z.array(z.enum(["IN_APP","EMAIL","SMS","PUSH"]))});
export async function POST(request:Request){await recordApiRequest({endpoint:"/api/student/notifications/dispatch",method:"POST",status:"REQUEST_RECEIVED"});await requireRole(["ADMIN","SUPER_ADMIN"]);const b=schema.parse(await request.json());return ok(await dispatchNotification(b.userId,b));}
