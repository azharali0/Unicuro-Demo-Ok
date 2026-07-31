# UniSphere API Database Wiring Fix Report

Generated: 2026-06-14T05:01:52.509829+00:00

## Implemented
- Added missing Prisma models for the core student engines.
- Added `lib/studentEnginesDb.ts`.
- Added DB-backed APIs for:
  - tasks
  - wallet
  - discounts
  - opportunities
  - scholarships
  - wellbeing check-in
  - career profile
  - marketplace listings
  - admin overview
- Added core engine seed script.

## API wiring status
- Total API routes detected: 144
- API routes with direct DB/service wiring evidence: 13
- API routes still requiring review: 131

## Commands for developer
```bash
npm install
npx prisma generate
npx prisma migrate dev --name api_database_wiring
npm run db:seed-core
npm run db:wiring-summary
npm run build
```

## Honest note
This patch connects the key product APIs to database services at source-code level. Runtime proof still requires installing dependencies, running migrations, and testing against a real PostgreSQL database.
