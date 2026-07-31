#!/usr/bin/env sh
set -eu
node scripts/check-migration-history.js
npx prisma validate
npx prisma generate
npx prisma migrate deploy
npx prisma migrate status
