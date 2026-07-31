# Disaster Recovery Runbook

## Recovery objectives

- Database RTO: 60 minutes
- Database RPO: 30 minutes
- Object storage RTO: 120 minutes
- Logs RTO: 45 minutes
- Configuration RTO: 240 minutes

## DR lifecycle

1. Detect incident.
2. Classify severity.
3. Freeze risky deployments.
4. Identify affected service.
5. Restore from verified backup where required.
6. Validate data integrity.
7. Resume service.
8. Notify stakeholders.
9. Run post-incident review.
