# Security Hardening Checklist

## Authentication
- Implement secure login.
- Store hashed passwords only if password auth is used.
- Use secure, httpOnly cookies.
- Enforce role-based access.

## Payments
- Verify Stripe webhook signatures.
- Store payment state server-side.
- Never trust client-side billing status.

## Data
- Encrypt sensitive fields where appropriate.
- Minimise PII.
- Add retention policies.
- Support account deletion/export.

## Admin
- Audit all admin/super-admin actions.
- Require stronger access controls for payouts, fraud cases, compliance and billing.
- Separate admin permissions.

## API
- Validate all payloads with Zod.
- Add rate limiting.
- Add monitoring.
- Add structured error responses.

## PWA
- Cache only safe assets.
- Avoid caching private API responses.
