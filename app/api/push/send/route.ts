import { z } from "zod";
import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { sendPush } from "@/lib/pushProvider";
import { ok } from "@/lib/http";
const schema=z.object({userId:z.string(),payload:z.any()});
export async function POST(request:Request){await recordApiRequest({endpoint:"/api/push/send",method:"POST",status:"REQUEST_RECEIVED"});await requireRole(["ADMIN","SUPER_ADMIN"]);const b=schema.parse(await request.json());return ok({results:await sendPush(b.userId,b.payload)});}
