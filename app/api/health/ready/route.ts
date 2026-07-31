import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
export async function GET() {
  const checks: Record<string, string> = {};
  try { await prisma.$queryRaw`SELECT 1`; checks.database = "ok"; } catch { checks.database = "failed"; }
  checks.redis = process.env.REDIS_URL ? "configured" : "missing";
  const ready = Object.values(checks).every((value) => value !== "failed" && value !== "missing");
  return Response.json({ status: ready ? "ready" : "not_ready", checks }, { status: ready ? 200 : 503 });
}
