# Hardening Sprint 1 — Security Architecture

## Implemented in this sprint

- Security hardening utility layer
- Security event schema
- MFA enrollment and verification scaffolds
- Threat score calculator
- Privileged action approval implementation module
- Security event endpoints
- Security incident endpoint
- Vulnerability register endpoint
- Admin Security dashboard tab
- Super Admin Security Governance dashboard tab
- Prisma security models
- Security middleware headers
- Penetration test readiness matrix

## Security principles

- MFA required for Admin and Super Admin.
- Risk-based MFA for students.
- Privileged actions require approval.
- Security events must be persisted.
- Suspicious devices must be reviewed.
- API abuse must be logged and throttled.
- Critical actions must create immutable audit evidence.

## Remaining before real production

- Connect security API routes to Prisma persistence.
- Replace review MFA with real TOTP validation.
- Enforce admin MFA in auth middleware.
- Add real IP/device intelligence.
- Add WAF and DDoS provider configuration.
- Run penetration testing.
