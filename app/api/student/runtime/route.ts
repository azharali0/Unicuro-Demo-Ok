import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { getWallet, getBudget, listCareerData } from "@/lib/studentRuntimeEngine";
import { ok } from "@/lib/http";
export async function GET(){ await recordApiRequest({endpoint:"/api/student/runtime",method:"GET",status:"REQUEST_RECEIVED"}); const u=await requireRole(["STUDENT","MERCHANT"]); const [wallet,budget,career]=await Promise.all([getWallet(u.id),getBudget(u.id),listCareerData(u.id)]); return ok({wallet,budget,career});}
