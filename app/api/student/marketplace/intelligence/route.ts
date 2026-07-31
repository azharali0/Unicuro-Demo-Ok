import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { getMarketplaceDashboard,refreshMarketplaceRecommendations } from "@/lib/marketplaceIntelligenceEngine";
import { ok } from "@/lib/http";
export async function GET(){await recordApiRequest({endpoint:"/api/student/marketplace/intelligence",method:"GET",status:"REQUEST_RECEIVED"});const u=await requireRole(["STUDENT","MERCHANT"]);return ok(await getMarketplaceDashboard(u.id));}
export async function PATCH(){await recordApiRequest({endpoint:"/api/student/marketplace/intelligence",method:"PATCH",status:"REQUEST_RECEIVED"});const u=await requireRole(["STUDENT","MERCHANT"]);return ok({recommendations:await refreshMarketplaceRecommendations(u.id)});}
