export type CodebaseRegistryItem = {
  key: string;
  area: string;
  source: string;
  purpose: string;
  status: "ACTIVE" | "RETAINED_DATA_CONTRACT" | "DEFERRED";
};

export const codebaseRegistry: CodebaseRegistryItem[] = [
  { key: "dynamic-pricing", area: "Billing", source: "lib/dynamicPricing.ts", purpose: "USD-base pricing with local currency display.", status: "ACTIVE" },
  { key: "fx-rates", area: "Billing", source: "lib/fxRates.ts", purpose: "FX update and local pricing recalculation.", status: "ACTIVE" },
  { key: "student-engines", area: "Student", source: "lib/studentEnginesDb.ts", purpose: "Database access for tasks, wallet, discounts, opportunities, scholarships, wellbeing, career and marketplace listings.", status: "ACTIVE" },
  { key: "community", area: "Community", source: "lib/communityEngine.ts", purpose: "Community categories, posts, replies, likes and reports.", status: "ACTIVE" },
  { key: "marketplace", area: "Marketplace", source: "lib/marketplaceEngine.ts", purpose: "Marketplace orders, refunds and seller payout flow.", status: "ACTIVE" },
  { key: "rewards", area: "Wallet", source: "lib/rewardsEngine.ts", purpose: "Reward events, referrals and cashback.", status: "ACTIVE" },
  { key: "notifications", area: "Notifications", source: "lib/notifications.ts", purpose: "In-app, push and email notification workflows.", status: "ACTIVE" },
  { key: "ai-academic", area: "AI", source: "lib/aiAcademic.ts", purpose: "Academic assistant with quota and conversation support.", status: "ACTIVE" },
  { key: "api-database", area: "Audit", source: "lib/apiDatabase.ts", purpose: "API request audit and route database registry support.", status: "ACTIVE" },
];
