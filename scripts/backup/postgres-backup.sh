#!/usr/bin/env sh
set -eu
: "${DATABASE_URL:?DATABASE_URL is required}"
mkdir -p backups
stamp=$(date -u +%Y%m%dT%H%M%SZ)
pg_dump --format=custom --no-owner --no-acl "$DATABASE_URL" > "backups/unicuro-${stamp}.dump"
sha256sum "backups/unicuro-${stamp}.dump" > "backups/unicuro-${stamp}.dump.sha256"
echo "backups/unicuro-${stamp}.dump"
