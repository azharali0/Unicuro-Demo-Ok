# UniSphere Production Readiness Runbook

## 1. Environment Setup

Create production environment variables from `.env.example`.

Required before production:
- DATABASE_URL
- AUTH_SECRET
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET
- RESEND_API_KEY
- OPENAI_API_KEY
- SENTRY_DSN
- VAPID keys

## 2. Database

```bash
npm install
npx prisma generate
npx prisma migrate deploy
```

Recommended production database:
- PostgreSQL
- Daily backups
- Point-in-time recovery
- Separate staging database

## 3. Security

Minimum checks:
- Strong AUTH_SECRET
- HTTPS only
- Secure cookies
- API authentication for admin/super-admin routes
- Stripe webhook signature verification
- Rate limiting on auth, AI and payment endpoints
- Audit logging for admin actions
- PII minimisation
- Role-based access control

## 4. Deployment

Recommended:
- Vercel for Next.js frontend/API
- Supabase/Neon/Railway/AWS RDS for Postgres
- Sentry for monitoring
- Resend for transactional email
- Stripe for payments

## 5. Pre-Launch Checklist

```bash
npm run typecheck
npm run build
npm run security:audit
```

Manually verify:
- Student dashboard
- Admin dashboard
- Super Admin dashboard
- PWA installability
- API health endpoint
- Stripe webhook endpoint
- Role-separated navigation
- Mobile responsiveness
- Error and empty states

## 6. Launch Safety

Start with:
- closed beta
- limited universities
- manual payout review
- restricted wallet limits
- limited AI budget
- admin audit logs enabled
