const fs = require("fs");
const path = require("path");
const root = process.cwd();
const schema = fs.existsSync(path.join(root, "prisma/schema.prisma")) ? fs.readFileSync(path.join(root, "prisma/schema.prisma"), "utf8") : "";
const requiredModels = [
  "NotificationPreference","ScheduledNotification","NotificationDelivery",
  "AiConversation","AiMessage","AiTokenLedger",
  "CommunityCategory","CommunityForumPost","CommunityReply","CommunityLike","CommunityReport","CommunitySavedPost","CommunityReputation",
  "RewardEvent","ReferralReward","CashbackReward",
  "MarketplaceOrder","MarketplaceRefund","SellerPayout"
];
for (const model of requiredModels) {
  console.log(`${schema.includes("model " + model) ? "PASS" : "MISSING"} ${model}`);
}
