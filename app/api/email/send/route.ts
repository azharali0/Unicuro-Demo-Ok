import { z } from "zod";
import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { sendEmail } from "@/lib/emailProvider";
import { ok } from "@/lib/http";
const schema=z.object({to:z.string().email(),subject:z.string().min(1),html:z.string().min(1),templateKey:z.string().min(1)});
export async function POST(request:Request){await recordApiRequest({endpoint:"/api/email/send",method:"POST",status:"REQUEST_RECEIVED"});const u=await requireRole(["ADMIN","SUPER_ADMIN"]);return ok({delivery:await sendEmail({userId:u.id,...schema.parse(await request.json())})});}
