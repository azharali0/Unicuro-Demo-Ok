const fs = require("fs");
const path = require("path");
const root = process.cwd();

function walk(dir) {
  if (!fs.existsSync(dir)) return await Promise.resolve([]);
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const routes = walk(path.join(root, "app", "api")).filter((file) => /route\.(ts|js|tsx|jsx)$/.test(file));
const rows = routes.map((file) => {
  const text = fs.readFileSync(file, "utf8");
  return {
    route: path.relative(root, file),
    dbConnected: text.includes("recordApiRequest") || text.includes("prisma."),
    usesPrisma: text.includes("prisma."),
    usesAudit: text.includes("recordApiRequest"),
  };
});
console.table(rows);
const disconnected = rows.filter((row) => !row.dbConnected);
if (disconnected.length) {
  console.error("Disconnected routes:", disconnected.map((row) => row.route));
  process.exitCode = 1;
}
