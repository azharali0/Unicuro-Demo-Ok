const fs = require("fs");
const path = require("path");
const root = process.cwd();
const apiRoot = path.join(root, "app", "api");
function walk(dir) {
  if (!fs.existsSync(dir)) return await Promise.resolve([]);
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}
const routes = walk(apiRoot).filter((f) => f.endsWith("route.ts") || f.endsWith("route.js"));
const rows = routes.map((file) => {
  const text = fs.readFileSync(file, "utf8");
  return {
    route: path.relative(root, file),
    usesPrisma: text.includes("prisma."),
    hasRoleGuard: text.includes("requireRole") || text.includes("getUniSphereSession"),
    validatesInput: text.includes("z.object") || text.includes(".parse("),
  };
});
console.table(rows);
