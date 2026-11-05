const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8').replace(/\r\n/g, '\n');

test('CI runs full tests without deployment credentials or privileged PR events', () => {
  const workflow = read('.github/workflows/ai-starter-checks.yml');
  assert.ok(workflow.includes('permissions:\n  contents: read'));
  assert.ok(workflow.includes('persist-credentials: false'));
  assert.ok(workflow.includes('run: npm test'));
  assert.ok(workflow.includes('windows-latest') && workflow.includes('ubuntu-latest'));
  assert.equal([...workflow.matchAll(/uses: actions\/(?:checkout|setup-node)@[a-f0-9]{40}\b/g)].length, 2);
  assert.ok(!workflow.includes('pull_request_target'));
  assert.ok(!workflow.includes('secrets.') && !workflow.includes('wrangler') && !workflow.includes('hs project upload'));
});

test('worked exercise and glossary stay linked from the human README', () => {
  assert.ok(read('README.md').includes('(docs/worked-example.md)'));
  assert.ok(read('README.md').includes('(docs/glossary.md)'));
  assert.ok(read('docs/worked-example.md').includes('npm run example:guided'));
  assert.ok(read('docs/worked-example.md').includes('synthetic'));
});

test('root and runnable-example environment templates agree and default to mock', () => {
  const { parseEnv } = require('node:util');
  const reference = parseEnv(read('.env.example'));
  const canonical = parseEnv(read('examples/minimal-oauth-service/.env.example'));
  assert.deepEqual(reference, canonical);
  assert.deepEqual(Object.keys(canonical).sort(), ["HUBSPOT_API_VERSION","HUBSPOT_CLIENT_ID","HUBSPOT_CLIENT_SECRET","HUBSPOT_PORTAL_ID","HUBSPOT_REDIRECT_URI","HUBSPOT_SCOPES","OAUTH_ADMIN_SECRET","OAUTH_STATE_SECRET","PORT","USE_MOCK_DATA"]);
  assert.equal(canonical.USE_MOCK_DATA, 'true');
  for (const [key, value] of Object.entries(canonical)) {
    if (/SECRET|TOKEN/.test(key)) assert.equal(value, '', 'Use an empty credential placeholder');
  }
});
