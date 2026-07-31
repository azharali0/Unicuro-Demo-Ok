export type EngineStatus = "READY" | "PARTIAL" | "CONFIGURATION_REQUIRED";

export type EngineDefinition = {
  key: string;
  name: string;
  purpose: string;
  routes: string[];
  models: string[];
  services: string[];
};

export const engineRegistry: EngineDefinition[] = [
  { key: "auth", name: "Authentication & Identity Engine", purpose: "Login, sessions, MFA and identity boundaries.", routes: ["/api/auth/login/student", "/api/auth/login/admin", "/api/auth/login/super-admin"], models: [], services: ["lib/session.ts", "lib/access-control.ts"] },
  { key: "pricing", name: "Dynamic Pricing & Global Billing Engine", purpose: "USD base pricing with local currency display.", routes: ["/api/pricing/current", "/api/billing/dynamic-checkout"], models: ["PricingRegion", "PricingPlan", "PricingRule"], services: ["lib/dynamicPricing.ts"] },
  { key: "notifications", name: "Notification Engine", purpose: "In-app, email, push, scheduling and preference delivery.", routes: ["/api/notifications", "/api/push/subscribe"], models: ["Notification", "NotificationPreference", "ScheduledNotification", "NotificationDelivery"], services: ["lib/notifications.ts", "lib/pushNotifications.ts"] },
  { key: "ai", name: "AI Academic Assistant Engine", purpose: "Study assistant, quota, conversations and token tracking.", routes: ["/api/student/academic/assistant"], models: ["AiUsageEvent", "AiConversation", "AiMessage", "AiTokenLedger"], services: ["lib/aiAcademic.ts", "lib/aiQuota.ts"] },
  { key: "community", name: "Community Engine", purpose: "Categories, posts, replies, likes, reports and reputation.", routes: ["/api/community/posts"], models: ["CommunityCategory", "CommunityForumPost", "CommunityReply", "CommunityLike", "CommunityReport"], services: ["lib/communityEngine.ts"] },
  { key: "wallet_rewards", name: "Wallet & Rewards Engine", purpose: "Wallet ledger, reward events, referrals and cashback.", routes: ["/api/student/wallet", "/api/student/rewards"], models: ["StudentWallet", "StudentWalletLedger", "RewardEvent", "ReferralReward", "CashbackReward"], services: ["lib/rewardsEngine.ts"] },
  { key: "marketplace", name: "Marketplace & Escrow Engine", purpose: "Listings, orders, escrow, refunds and seller payouts.", routes: ["/api/student/marketplace/listings", "/api/marketplace/orders"], models: ["StudentMarketplaceListing", "MarketplaceOrder", "MarketplaceRefund", "SellerPayout"], services: ["lib/marketplaceEngine.ts", "lib/escrow.ts"] },
];
