# Financial Reconciliation Runbook

## Daily reconciliation

1. Import provider payment events.
2. Match provider events to internal PaymentEvent records.
3. Match wallet ledger entries.
4. Match settlement report totals.
5. Identify variance.
6. Classify as Matched, Tolerance Review or Mismatch.
7. Escalate mismatches to Finance Admin.
8. Preserve evidence.

## Reconciliation sources

- Stripe
- Wallet ledger
- Marketplace transactions
- Partner revenue
- University licence invoices
- Featured listings
