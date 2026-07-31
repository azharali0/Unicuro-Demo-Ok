const fs = require("fs");
const path = require("path");
const root = process.cwd();
const ignore = new Set(["node_modules", ".next", "dist", "build", ".git", "coverage"]);

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if ([...ignore].some((x) => full.split(path.sep).includes(x))) return [];
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const code = walk(root).filter((file) => /\.(ts|tsx|js|jsx)$/.test(file));
const all = code.map((file) => [path.relative(root, file), fs.readFileSync(file, "utf8")]);

const findings = [];
for (const [file, text] of all) {
    findings.push({ file, issue: "dead-code-marker" });
  }
}

console.table(findings);
if (findings.length) process.exitCode = 1;
