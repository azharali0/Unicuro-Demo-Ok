const checks = [
  "FxRateSnapshot model",
  "PromoRedemption model",
  "StripeWebhookEvent model",
  "PushSubscription model",
  "EmailDelivery model",
  "AiUsageEvent model",
  "MarketplaceEscrowEvent model",
  "FX update route",
  "Push subscribe route",
  "Email send route",
  "Billing webhook persistence",
  "Escrow persistence",
];
for (const check of checks) console.log("- " + check);
