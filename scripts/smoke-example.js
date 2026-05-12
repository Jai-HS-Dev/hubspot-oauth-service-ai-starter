const { spawn } = require('node:child_process');
const path = require('node:path');

const repoType = process.env.SMOKE_REPO_TYPE || inferRepoType();
const port = String(4100 + Math.floor(Math.random() * 1000));
const config = getConfig(repoType);
const exampleDir = path.join(process.cwd(), config.exampleDir);

let child;

main().catch((error) => {
  console.error(`Smoke check failed: ${error.message}`);
  if (child) child.kill();
  process.exit(1);
});

async function main() {
  child = spawn(process.execPath, ['server.js'], {
    cwd: exampleDir,
    env: {
      ...process.env,
      PORT: port,
      USE_MOCK_DATA: 'true'
    },
    stdio: ['ignore', 'pipe', 'pipe']
  });

  child.stdout.on('data', (chunk) => process.stdout.write(chunk));
  child.stderr.on('data', (chunk) => process.stderr.write(chunk));

  await waitForServer(`http://127.0.0.1:${port}/`);
  await config.assert(`http://127.0.0.1:${port}`);
  child.kill();
  console.log(`${repoType} smoke example passed.`);
}

function getConfig(type) {
  if (type === 'oauth') {
    return {
      exampleDir: 'examples/minimal-oauth-service',
      assert: async (baseUrl) => {
        const response = await fetch(`${baseUrl}/`);
        const body = await response.json();
        assert(response.ok, 'root route should return 200');
        assert(Array.isArray(body.routes), 'root route should list routes');
      }
    };
  }

  if (type === 'agent') {
    return {
      exampleDir: 'examples/simple-contact-brief-agent-tool',
      assert: async (baseUrl) => {
        const response = await fetch(`${baseUrl}/api/contact-brief`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ inputFields: { contactId: 'sample-1', briefType: 'sales' } })
        });
        const body = await response.json();
        assert(response.ok, 'contact brief route should return 200');
        assert(body.hs_execution_state === 'SUCCESS', 'response should report SUCCESS');
        assert(body.outputFields && body.outputFields.brief, 'response should include outputFields.brief');
      }
    };
  }

  if (type === 'card') {
    return {
      exampleDir: 'examples/contact-card-with-agent-tool',
      assert: async (baseUrl) => {
        const response = await fetch(`${baseUrl}/api/contact-brief`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ inputFields: { contactId: 'sample-1' } })
        });
        const body = await response.json();
        assert(response.ok, 'contact card backend route should return 200');
        assert(body.hs_execution_state === 'SUCCESS', 'response should report SUCCESS');
        assert(body.outputFields && body.outputFields.brief, 'response should include outputFields.brief');
      }
    };
  }

  throw new Error(`Unknown SMOKE_REPO_TYPE: ${type}`);
}

function inferRepoType() {
  const cwd = process.cwd().toLowerCase();
  if (cwd.includes('oauth')) return 'oauth';
  if (cwd.includes('contact-card')) return 'card';
  return 'agent';
}

async function waitForServer(url) {
  const started = Date.now();
  while (Date.now() - started < 5000) {
    if (child.exitCode !== null) throw new Error('example server exited before smoke check');
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch (_) {
      await delay(150);
    }
  }
  throw new Error('example server did not start within 5 seconds');
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}