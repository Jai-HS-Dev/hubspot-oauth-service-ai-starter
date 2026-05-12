const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
const requiredFiles = [
  'README.md',
  'START_WITH_AI.md',
  'AGENTS.md',
  'SECURITY.md',
  'docs/start-here.md',
  'docs/security-for-non-developers.md',
  'docs/ai-coding-tools.md',
  'docs/auth-options.md',
  'docs/hosting-options.md',
  'docs/developer-architecture.md',
  'docs/non-developer-safety-gates.md',
  'REAL_TOOL_CHECKLIST.md',
  '.github/prompts/choose-auth-and-hosting.prompt.md',
  '.github/prompts/security-review-before-deploy.prompt.md',
  '.github/prompts/turn-mock-into-real-hubspot-api.prompt.md',
  '.cursor/rules/hubspot-ai-starter.mdc',
  '.windsurfrules'
];

const forbiddenPatterns = [
  { name: 'raw HubSpot private token', pattern: /pat-[a-z0-9_-]{20,}/i },
  { name: 'secret assigned in docs', pattern: /(CLIENT_SECRET|ACCESS_TOKEN|REFRESH_TOKEN|PRIVATE_APP_ACCESS_TOKEN)[ \t]*=[ \t]*['\"]?[A-Za-z0-9_\-]{16,}/ }
];

for (const marker of String(process.env.AI_READINESS_FORBIDDEN_MARKERS || '').split('|')) {
  const trimmed = marker.trim();
  if (trimmed) {
    forbiddenPatterns.push({
      name: 'custom private marker',
      pattern: new RegExp(escapeRegExp(trimmed), 'i')
    });
  }
}

const ignoredDirs = new Set(['.git', 'node_modules', 'dist', 'build']);
const ignoredFiles = new Set(['package-lock.json']);
const failures = [];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) {
    failures.push(`Missing required AI starter file: ${file}`);
  }
}

if (fs.existsSync(path.join(root, '.env'))) {
  failures.push('A real .env file exists in the repo root. Keep it local and never commit it.');
}

for (const file of walk(root)) {
  const rel = path.relative(root, file).replace(/\\/g, '/');
  const content = fs.readFileSync(file, 'utf8');
  for (const rule of forbiddenPatterns) {
    if (rule.pattern.test(content)) {
      failures.push(`${rel}: matched ${rule.name}`);
    }
  }
}

if (failures.length) {
  console.error('AI readiness check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('AI readiness check passed. Required files exist and no obvious private markers were found.');

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoredDirs.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (entry.isFile() && shouldRead(full)) {
      yield full;
    }
  }
}

function shouldRead(fullPath) {
  const rel = path.relative(root, fullPath).replace(/\\/g, '/');
  if (ignoredFiles.has(rel)) return false;
  const name = path.basename(fullPath);
  return /\.(md|mdc|txt|js|jsx|json|yml|yaml|example)$/.test(name) || name === '.windsurfrules' || name === '.gitignore';
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}