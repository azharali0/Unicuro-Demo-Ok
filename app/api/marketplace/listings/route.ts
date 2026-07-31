import { z } from "zod";
import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { createOperationContext } from "@/lib/operations/context";
import { traceStage } from "@/lib/operations/trace";
import { enqueueDomainEvent } from "@/lib/operations/queue";
import { createMarketplaceListingOperation } from "@/lib/services/marketplaceService";
import { prisma } from "@/lib/prisma";
import { ok } from "@/lib/http";

const schema = z.object({
  title: z.string().min(2).max(200),
  description: z.string().min(10).max(10000),
  category: z.string().min(2).max(100),
  priceCents: z.number().int().nonnegative().max(100000000),
  currencyCode: z.string().length(3),
});

export async function GET() {
  await recordApiRequest({ endpoint: "/api/marketplace/listings", method: "GET", status: "REQUEST_RECEIVED" });
  await requireRole(["STUDENT", "MERCHANT"]);
  return ok({
    listings: await prisma.studentMarketplaceListing.findMany({
      where: { status: "LIVE" },
      orderBy: { createdAt: "desc" },
    }),
  });
}

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/marketplace/listings", method: "POST", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["MERCHANT"]);
  const context = createOperationContext("marketplace.listing.create", user.id, request.headers.get("x-correlation-id") || undefined);
  const body = await traceStage(context, "API_VALIDATION", async () => schema.parse(await request.json()));
  const result = await traceStage(context, "SERVICE", () => createMarketplaceListingOperation(context, user.id, body));
  const queued = await traceStage(context, "QUEUE", () => enqueueDomainEvent(result.eventId));
  return ok({ listing: result.listing, queued, correlationId: context.correlationId }, { status: 201 });
}
