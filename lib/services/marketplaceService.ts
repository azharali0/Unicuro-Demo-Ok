import { prisma } from "@/lib/prisma";
import { createDomainEvent } from "@/lib/operations/outbox";
import type { OperationContext } from "@/lib/operations/types";
import { traceStage } from "@/lib/operations/trace";

export type CreateMarketplaceListingInput = {
  title: string;
  description: string;
  category: string;
  priceCents: number;
  currencyCode: string;
};

export async function createMarketplaceListingOperation(
  context: OperationContext,
  sellerId: string,
  input: CreateMarketplaceListingInput
) {
  return traceStage(context, "DATABASE_TRANSACTION", () =>
    prisma.$transaction(async (tx) => {
      const listing = await tx.studentMarketplaceListing.create({
        data: { sellerId, status: "LIVE", ...input },
      });
      const event = await createDomainEvent(tx, {
        aggregateType: "StudentMarketplaceListing",
        aggregateId: listing.id,
        eventType: "marketplace.listing.created",
        payload: { userId: sellerId, listingId: listing.id },
      });
      return { listing, eventId: event.id };
    })
  );
}
