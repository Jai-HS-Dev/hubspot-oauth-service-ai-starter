const path = require('node:path');

const repoType = process.env.SMOKE_REPO_TYPE || inferRepoType();
const port = String(4100 + Math.floor(Math.random() * 1000));
const config = getConfig(repoType);
const exampleDir = path.join(process.cwd(), config.exampleDir);

main().catch((error) => {
  console.error(`Smoke check failed: ${error.message}`);
  process.exit(1);
});

async function main() {
  process.env.PORT = port;
  process.env.USE_MOCK_DATA = 'true';
  const { startServer } = require(path.join(exampleDir, 'server.js'));
  const server = startServer(Number(port));

  try {
    await waitForServer(`http://127.0.0.1:${port}/`);
    await config.assert(`http://127.0.0.1:${port}`);
    console.log(`${repoType} smoke example passed.`);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => error ? reject(error) : resolve());
    });
  }
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
