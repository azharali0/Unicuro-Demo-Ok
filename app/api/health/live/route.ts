export const dynamic = "force-dynamic";
export async function GET() {
  return Response.json({ status: "live", timestamp: new Date().toISOString() });
}
