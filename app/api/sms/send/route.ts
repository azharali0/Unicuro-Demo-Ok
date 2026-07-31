import { z } from "zod";
import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { sendSms } from "@/lib/smsProvider";
import { ok } from "@/lib/http";
const schema=z.object({to:z.string().min(5),body:z.string().min(1),templateKey:z.string().min(1)});
export async function POST(request:Request){await recordApiRequest({endpoint:"/api/sms/send",method:"POST",status:"REQUEST_RECEIVED"});const u=await requireRole(["ADMIN","SUPER_ADMIN"]);return ok({delivery:await sendSms({userId:u.id,...schema.parse(await request.json())})});}
