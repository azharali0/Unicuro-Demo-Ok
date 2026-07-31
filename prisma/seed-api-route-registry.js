const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const routes = [
  {
    "endpoint": "/api/health",
    "methods": [
      "GET"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/notifications",
    "methods": [
      "GET",
      "POST"
    ],
    "purpose": "Notification, push or email workflow operation.",
    "productArea": "Notifications",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/messages",
    "methods": [
      "GET"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/production-readiness",
    "methods": [
      "GET"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/homepage",
    "methods": [
      "GET"
    ],
    "purpose": "Read or manage database-driven homepage content.",
    "productArea": "Homepage CMS",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/email/send",
    "methods": [
      "POST"
    ],
    "purpose": "Notification, push or email workflow operation.",
    "productArea": "Notifications",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/push/subscribe",
    "methods": [
      "POST"
    ],
    "purpose": "Notification, push or email workflow operation.",
    "productArea": "Notifications",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/fx/update",
    "methods": [
      "POST"
    ],
    "purpose": "FX rate update and pricing rule refresh.",
    "productArea": "Pricing",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/pilot-launch/universities",
    "methods": [
      "GET",
      "POST"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/pilot-launch/cohorts",
    "methods": [
      "GET"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/pilot-launch/adoption",
    "methods": [
      "GET",
      "POST"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/pilot-launch/feedback",
    "methods": [
      "GET",
      "POST"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/pilot-launch/retention",
    "methods": [
      "GET"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/pilot-launch/support",
    "methods": [
      "GET"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/pilot-launch/success-report",
    "methods": [
      "GET"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/production/rollout-plan",
    "methods": [
      "GET"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/investor/demo-environment",
    "methods": [
      "GET"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/pilot/universities",
    "methods": [
      "GET",
      "POST"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/pilot/health",
    "methods": [
      "GET"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/deployment/environments",
    "methods": [
      "GET"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/deployment/providers",
    "methods": [
      "GET",
      "POST"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/deployment/rollout-gates",
    "methods": [
      "GET",
      "POST"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/deployment/readiness-score",
    "methods": [
      "GET"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/load-testing/scenarios",
    "methods": [
      "GET"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/readiness/production-candidate",
    "methods": [
      "GET"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/uat/feedback",
    "methods": [
      "GET",
      "POST"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/release/candidates",
    "methods": [
      "GET",
      "POST"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/performance/metrics",
    "methods": [
      "GET",
      "POST"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/accessibility/issues",
    "methods": [
      "GET",
      "POST"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/qa/test-runs",
    "methods": [
      "GET",
      "POST"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/qa/test-cases",
    "methods": [
      "GET"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/infra/health",
    "methods": [
      "GET",
      "POST"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/infra/backup",
    "methods": [
      "GET",
      "POST"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/infra/restore-test",
    "methods": [
      "GET"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/infra/incidents",
    "methods": [
      "GET",
      "POST"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/infra/capacity",
    "methods": [
      "GET"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/infra/queues",
    "methods": [
      "GET"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/infra/feature-flags",
    "methods": [
      "GET",
      "POST"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/finance/payment-event",
    "methods": [
      "POST"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/finance/ledger-entry",
    "methods": [
      "POST"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/finance/reconciliation",
    "methods": [
      "GET"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": true
  },
  {
    "endpoint": "/api/finance/fraud-case",
    "methods": [
      "POST"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/finance/disputes",
    "methods": [
      "GET"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/finance/settlements",
    "methods": [
      "GET"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/compliance/consent",
    "methods": [
      "GET",
      "POST"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/compliance/dsar",
    "methods": [
      "GET",
      "POST"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/compliance/retention",
    "methods": [
      "GET",
      "POST"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/compliance/processing-activities",
    "methods": [
      "GET",
      "POST"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/compliance/policies",
    "methods": [
      "GET"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/compliance/processors",
    "methods": [
      "GET"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/security/events",
    "methods": [
      "GET",
      "POST"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/security/threat-score",
    "methods": [
      "GET"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/security/privileged-action",
    "methods": [
      "POST"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/security/incidents",
    "methods": [
      "GET"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/security/vulnerabilities",
    "methods": [
      "GET"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/security/mfa/enroll",
    "methods": [
      "POST"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/security/mfa/verify",
    "methods": [
      "POST"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/growth/waitlist",
    "methods": [
      "POST"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/growth/referral",
    "methods": [
      "GET"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/growth/campaigns",
    "methods": [
      "POST"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/growth/seo-pages",
    "methods": [
      "GET"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/institution/partners",
    "methods": [
      "POST"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/institution/campus-operations",
    "methods": [
      "GET"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/institution/success-reports",
    "methods": [
      "GET"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/institution/campaigns",
    "methods": [
      "GET"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/academic/assets",
    "methods": [
      "POST"
    ],
    "purpose": "AI academic assistant, quota, conversation or study operation.",
    "productArea": "AI Academic",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/academic/quiz",
    "methods": [
      "POST"
    ],
    "purpose": "AI academic assistant, quota, conversation or study operation.",
    "productArea": "AI Academic",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/academic/revision-plan",
    "methods": [
      "GET"
    ],
    "purpose": "AI academic assistant, quota, conversation or study operation.",
    "productArea": "AI Academic",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/academic/insights",
    "methods": [
      "GET"
    ],
    "purpose": "AI academic assistant, quota, conversation or study operation.",
    "productArea": "AI Academic",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/identity/verify",
    "methods": [
      "POST"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/auth/signup",
    "methods": [
      "POST"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/auth/otp",
    "methods": [
      "POST"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/auth/login/student",
    "methods": [
      "POST"
    ],
    "purpose": "Student login and student dashboard redirect.",
    "productArea": "Authentication",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/auth/login/admin",
    "methods": [
      "POST"
    ],
    "purpose": "Admin login with MFA and admin dashboard redirect.",
    "productArea": "Authentication",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/auth/login/super-admin",
    "methods": [
      "POST"
    ],
    "purpose": "Super Admin login with MFA and governance dashboard redirect.",
    "productArea": "Authentication",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/student/profile",
    "methods": [
      "POST"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/student/tasks",
    "methods": [
      "GET",
      "POST"
    ],
    "purpose": "Student task list/create/update operation.",
    "productArea": "Student Planner",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/student/wallet",
    "methods": [
      "GET"
    ],
    "purpose": "Student wallet and ledger operation.",
    "productArea": "Wallet",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/student/discounts",
    "methods": [
      "GET"
    ],
    "purpose": "Student deal/discount operation.",
    "productArea": "Discounts",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/student/opportunities",
    "methods": [
      "GET"
    ],
    "purpose": "Student jobs/gigs/opportunities operation.",
    "productArea": "Earn",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/student/scholarships",
    "methods": [
      "GET"
    ],
    "purpose": "Scholarship/funding operation.",
    "productArea": "Scholarships",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/student/rewards",
    "methods": [
      "GET",
      "POST"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/student/marketplace/listings",
    "methods": [
      "GET",
      "POST"
    ],
    "purpose": "Marketplace listing/order/escrow/refund operation.",
    "productArea": "Marketplace",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/student/career/profile",
    "methods": [
      "GET",
      "PATCH"
    ],
    "purpose": "Student career profile operation.",
    "productArea": "Career",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/student/wellbeing/check-in",
    "methods": [
      "POST"
    ],
    "purpose": "Student wellbeing check-in operation.",
    "productArea": "Wellbeing",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/student/academic/assistant",
    "methods": [
      "GET",
      "POST"
    ],
    "purpose": "AI academic assistant, quota, conversation or study operation.",
    "productArea": "AI Academic",
    "requiresProvider": true
  },
  {
    "endpoint": "/api/student/academic/conversations",
    "methods": [
      "GET"
    ],
    "purpose": "AI academic assistant, quota, conversation or study operation.",
    "productArea": "AI Academic",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/admin/users",
    "methods": [
      "GET"
    ],
    "purpose": "Admin operational API.",
    "productArea": "Admin",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/admin/identity-cases",
    "methods": [
      "GET"
    ],
    "purpose": "Admin operational API.",
    "productArea": "Admin",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/admin/academic",
    "methods": [
      "GET"
    ],
    "purpose": "AI academic assistant, quota, conversation or study operation.",
    "productArea": "AI Academic",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/admin/wellbeing",
    "methods": [
      "GET"
    ],
    "purpose": "Student wellbeing check-in operation.",
    "productArea": "Wellbeing",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/admin/institutions",
    "methods": [
      "GET"
    ],
    "purpose": "Admin operational API.",
    "productArea": "Admin",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/admin/mobile",
    "methods": [
      "GET"
    ],
    "purpose": "Admin operational API.",
    "productArea": "Admin",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/admin/growth",
    "methods": [
      "GET"
    ],
    "purpose": "Admin operational API.",
    "productArea": "Admin",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/admin/launch",
    "methods": [
      "GET"
    ],
    "purpose": "Admin operational API.",
    "productArea": "Admin",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/admin/security",
    "methods": [
      "GET"
    ],
    "purpose": "Admin operational API.",
    "productArea": "Admin",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/admin/compliance",
    "methods": [
      "GET"
    ],
    "purpose": "Admin operational API.",
    "productArea": "Admin",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/admin/finance",
    "methods": [
      "GET"
    ],
    "purpose": "Admin operational API.",
    "productArea": "Admin",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/admin/infrastructure",
    "methods": [
      "GET"
    ],
    "purpose": "Admin operational API.",
    "productArea": "Admin",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/admin/qa",
    "methods": [
      "GET"
    ],
    "purpose": "Admin operational API.",
    "productArea": "Admin",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/admin/deployment",
    "methods": [
      "GET"
    ],
    "purpose": "Admin operational API.",
    "productArea": "Admin",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/admin/pilot-launch",
    "methods": [
      "GET"
    ],
    "purpose": "Admin operational API.",
    "productArea": "Admin",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/admin/pricing",
    "methods": [
      "GET"
    ],
    "purpose": "Admin operational API.",
    "productArea": "Admin",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/admin/overview",
    "methods": [
      "GET"
    ],
    "purpose": "Admin operational API.",
    "productArea": "Admin",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/admin/engines",
    "methods": [
      "GET"
    ],
    "purpose": "Admin operational API.",
    "productArea": "Admin",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/super-admin/metrics",
    "methods": [
      "GET"
    ],
    "purpose": "Admin operational API.",
    "productArea": "Admin",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/super-admin/identity-metrics",
    "methods": [
      "GET"
    ],
    "purpose": "Admin operational API.",
    "productArea": "Admin",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/super-admin/communications-metrics",
    "methods": [
      "GET"
    ],
    "purpose": "Admin operational API.",
    "productArea": "Admin",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/super-admin/academic-metrics",
    "methods": [
      "GET"
    ],
    "purpose": "AI academic assistant, quota, conversation or study operation.",
    "productArea": "AI Academic",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/super-admin/wellbeing-metrics",
    "methods": [
      "GET"
    ],
    "purpose": "Student wellbeing check-in operation.",
    "productArea": "Wellbeing",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/super-admin/institution-metrics",
    "methods": [
      "GET"
    ],
    "purpose": "Admin operational API.",
    "productArea": "Admin",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/super-admin/mobile-metrics",
    "methods": [
      "GET"
    ],
    "purpose": "Admin operational API.",
    "productArea": "Admin",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/super-admin/growth-metrics",
    "methods": [
      "GET"
    ],
    "purpose": "Admin operational API.",
    "productArea": "Admin",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/super-admin/launch-metrics",
    "methods": [
      "GET"
    ],
    "purpose": "Admin operational API.",
    "productArea": "Admin",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/super-admin/security-governance",
    "methods": [
      "GET"
    ],
    "purpose": "Admin operational API.",
    "productArea": "Admin",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/super-admin/compliance-governance",
    "methods": [
      "GET"
    ],
    "purpose": "Admin operational API.",
    "productArea": "Admin",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/super-admin/financial-governance",
    "methods": [
      "GET"
    ],
    "purpose": "Admin operational API.",
    "productArea": "Admin",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/super-admin/reliability-governance",
    "methods": [
      "GET"
    ],
    "purpose": "Admin operational API.",
    "productArea": "Admin",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/super-admin/quality-governance",
    "methods": [
      "GET"
    ],
    "purpose": "Admin operational API.",
    "productArea": "Admin",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/super-admin/deployment-governance",
    "methods": [
      "GET"
    ],
    "purpose": "Admin operational API.",
    "productArea": "Admin",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/super-admin/pilot-governance",
    "methods": [
      "GET"
    ],
    "purpose": "Admin operational API.",
    "productArea": "Admin",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/super-admin/pricing-governance",
    "methods": [
      "GET",
      "POST"
    ],
    "purpose": "Admin operational API.",
    "productArea": "Admin",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/billing/webhook",
    "methods": [
      "POST"
    ],
    "purpose": "Billing, checkout, webhook or subscription entitlement operation.",
    "productArea": "Billing",
    "requiresProvider": true
  },
  {
    "endpoint": "/api/billing/checkout",
    "methods": [
      "POST"
    ],
    "purpose": "Billing, checkout, webhook or subscription entitlement operation.",
    "productArea": "Billing",
    "requiresProvider": true
  },
  {
    "endpoint": "/api/billing/dynamic-checkout",
    "methods": [
      "POST"
    ],
    "purpose": "Billing, checkout, webhook or subscription entitlement operation.",
    "productArea": "Billing",
    "requiresProvider": true
  },
  {
    "endpoint": "/api/support/chat",
    "methods": [
      "POST"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/communications/campaigns",
    "methods": [
      "POST"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/communications/preferences",
    "methods": [
      "GET"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/wellbeing/check-in",
    "methods": [
      "POST"
    ],
    "purpose": "Student wellbeing check-in operation.",
    "productArea": "Wellbeing",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/wellbeing/burnout",
    "methods": [
      "GET"
    ],
    "purpose": "Student wellbeing check-in operation.",
    "productArea": "Wellbeing",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/wellbeing/resources",
    "methods": [
      "GET"
    ],
    "purpose": "Student wellbeing check-in operation.",
    "productArea": "Wellbeing",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/wellbeing/life-reminders",
    "methods": [
      "GET"
    ],
    "purpose": "Student wellbeing check-in operation.",
    "productArea": "Wellbeing",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/mobile/push-subscribe",
    "methods": [
      "POST"
    ],
    "purpose": "Notification, push or email workflow operation.",
    "productArea": "Notifications",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/mobile/sync",
    "methods": [
      "POST"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/mobile/widgets",
    "methods": [
      "GET"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/mobile/capabilities",
    "methods": [
      "GET"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/launch/readiness",
    "methods": [
      "GET",
      "POST"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/launch/qa",
    "methods": [
      "GET"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/launch/compliance",
    "methods": [
      "GET"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/launch/deployment-certification",
    "methods": [
      "GET"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/launch/investor-kpis",
    "methods": [
      "GET"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/launch/go-no-go",
    "methods": [
      "GET"
    ],
    "purpose": "General UniSphere API operation.",
    "productArea": "General",
    "requiresProvider": true
  },
  {
    "endpoint": "/api/community/posts",
    "methods": [
      "GET",
      "POST"
    ],
    "purpose": "Community forum/category/post/reply/like/report operation.",
    "productArea": "Community",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/community/categories",
    "methods": [
      "GET",
      "POST"
    ],
    "purpose": "Community forum/category/post/reply/like/report operation.",
    "productArea": "Community",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/community/posts/:postId/replies",
    "methods": [
      "POST"
    ],
    "purpose": "Community forum/category/post/reply/like/report operation.",
    "productArea": "Community",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/community/posts/:postId/like",
    "methods": [
      "POST"
    ],
    "purpose": "Community forum/category/post/reply/like/report operation.",
    "productArea": "Community",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/community/posts/:postId/report",
    "methods": [
      "POST"
    ],
    "purpose": "Community forum/category/post/reply/like/report operation.",
    "productArea": "Community",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/marketplace/orders",
    "methods": [
      "GET",
      "POST"
    ],
    "purpose": "Marketplace listing/order/escrow/refund operation.",
    "productArea": "Marketplace",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/marketplace/escrow/checkout",
    "methods": [
      "POST"
    ],
    "purpose": "Marketplace listing/order/escrow/refund operation.",
    "productArea": "Marketplace",
    "requiresProvider": true
  },
  {
    "endpoint": "/api/marketplace/orders/:orderId/refunds",
    "methods": [
      "POST"
    ],
    "purpose": "Marketplace listing/order/escrow/refund operation.",
    "productArea": "Marketplace",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/pricing/current",
    "methods": [
      "GET"
    ],
    "purpose": "Return dynamic local pricing from USD base.",
    "productArea": "Pricing",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/pricing/regions",
    "methods": [
      "GET"
    ],
    "purpose": "Return active pricing regions.",
    "productArea": "Pricing",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/pricing/languages",
    "methods": [
      "GET"
    ],
    "purpose": "Return supported language options.",
    "productArea": "Localisation",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/notifications/preferences",
    "methods": [
      "GET",
      "PATCH"
    ],
    "purpose": "Notification, push or email workflow operation.",
    "productArea": "Notifications",
    "requiresProvider": false
  },
  {
    "endpoint": "/api/notifications/schedule",
    "methods": [
      "POST"
    ],
    "purpose": "Notification, push or email workflow operation.",
    "productArea": "Notifications",
    "requiresProvider": false
  }
];

async function main() {
  for (const route of routes) {
    await prisma.apiRouteRegistry.upsert({
      where: { endpoint: route.endpoint },
      update: {
        methods: route.methods,
        purpose: route.purpose,
        productArea: route.productArea,
        requiresProvider: route.requiresProvider,
        functionalStatus: route.requiresProvider ? "DB_CONNECTED_PROVIDER_REQUIRED" : "DB_CONNECTED",
        active: true,
      },
      create: {
        endpoint: route.endpoint,
        methods: route.methods,
        purpose: route.purpose,
        productArea: route.productArea,
        requiresProvider: route.requiresProvider,
        functionalStatus: route.requiresProvider ? "DB_CONNECTED_PROVIDER_REQUIRED" : "DB_CONNECTED",
        active: true,
      },
    });
  }
}

main().finally(() => prisma.$disconnect());
