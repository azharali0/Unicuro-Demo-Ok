import { recordApiRequest } from "@/lib/apiDatabase";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";
import { detectCountryFromHeaders, getDynamicPricing } from "@/lib/dynamicPricing";
import { prisma } from "@/lib/prisma";
import { getUniCuroSession } from "@/lib/session";
import { validatePromoCode } from "@/lib/promoRedemptions";

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" as any }) : null;
const schema = z.object({ billingPeriod: z.enum(["monthly", "quarterly", "yearly"]), countryCode: z.string().optional(), languageCode: z.string().optional(), promoCode: z.string().optional() });

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/billing/dynamic-checkout", method: "POST", status: "REQUEST_RECEIVED" });
  const user = await getUniCuroSession();
  if (!user) return NextResponse.json({ ok: false, error: "Unauthenticated" }, { status: 401 });
  if (!stripe) return NextResponse.json({ ok: false, error: "Stripe is not configured" }, { status: 428 });

  const body = schema.parse(await request.json());
  const promo = body.promoCode ? await validatePromoCode(body.promoCode) : null;
  if (body.promoCode && !promo) return NextResponse.json({ ok: false, error: "Invalid or expired promo code" }, { status: 422 });

  const pricing = await getDynamicPricing({
    countryCode: body.countryCode || detectCountryFromHeaders(request.headers),
    languageCode: body.languageCode || "en",
    promoCode: body.promoCode,
    prisma,
  });
  const selected = pricing.prices[body.billingPeriod];

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: user.email,
    line_items: selected.stripePriceId ? [{ price: selected.stripePriceId, quantity: 1 }] : [{
      price_data: {
        currency: pricing.region.currencyCode.toLowerCase(),
        product_data: { name: pricing.plan.name },
        unit_amount: selected.localCents,
        recurring: { interval: body.billingPeriod === "yearly" ? "year" : "month", interval_count: body.billingPeriod === "quarterly" ? 3 : 1 },
      },
      quantity: 1,
    }],
    metadata: {
      userId: user.id,
      planCode: pricing.plan.code,
      baseCurrency: "USD",
      countryCode: pricing.region.countryCode,
      currencyCode: pricing.region.currencyCode,
      billingPeriod: body.billingPeriod,
      promoCode: promo?.code || "",
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/student?billing=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/student?billing=cancelled`,
  });

  return NextResponse.json({ ok: true, url: session.url, pricing });
}
