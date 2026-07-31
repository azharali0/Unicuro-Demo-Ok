const fs = require("fs");
const path = require("path");
const dir = path.join(process.cwd(), "prisma", "migrations");
const migrations = fs.existsSync(dir)
  ? fs.readdirSync(dir).filter((name) => fs.existsSync(path.join(dir, name, "migration.sql")))
  : [];
if (!migrations.length) {
  console.error("No committed Prisma migration history found. Generate and review a baseline migration before production deployment.");
  process.exit(1);
}
console.log(`Migration history present: ${migrations.length} migration(s).`);
