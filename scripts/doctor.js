const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
const failures = [];
const warnings = [];
const major = Number(process.versions.node.split('.')[0]);

if (major < 22) {
  failures.push(`Node.js 22 or newer is required; found ${process.versions.node}.`);
}

for (const file of ['README.md', 'AGENTS.md', 'COMPATIBILITY.md', 'MIGRATION.md', '.env.example']) {
  if (!fs.existsSync(path.join(root, file))) failures.push(`Missing ${file}.`);
}

if (fs.existsSync(path.join(root, '.env'))) {
  warnings.push('A local .env exists. Confirm it is ignored and never commit it.');
}

const exampleEnv = fs.readFileSync(path.join(root, '.env.example'), 'utf8');
if (/=(?:pat-[A-Za-z0-9_-]+|[A-Za-z0-9_-]{32,})/i.test(exampleEnv)) {
  failures.push('.env.example appears to contain a credential instead of a placeholder.');
}

const result = {
  ok: failures.length === 0,
  node: process.versions.node,
  hubspotPlatform: '2026.09',
  failures,
  warnings
};

console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exit(1);

