# Incident Response Runbook

## Severity levels

- Critical: active breach, data exposure, payment compromise, admin takeover.
- High: credential stuffing, privilege misuse, major API abuse, wallet fraud spike.
- Medium: suspicious device cluster, moderate abuse, failed security control.
- Low: informational event or isolated blocked attempt.

## Response lifecycle

1. Detect
2. Triage
3. Contain
4. Investigate
5. Remediate
6. Recover
7. Notify if required
8. Post-incident review

## Evidence to preserve

- audit logs
- security events
- API logs
- login history
- IP/device metadata
- affected records
- privileged actions
- admin changes

## Escalation

Critical and High incidents must be escalated to Super Admin and Security owner immediately.
