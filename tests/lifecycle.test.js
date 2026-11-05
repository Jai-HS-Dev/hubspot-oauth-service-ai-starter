const { test } = require('node:test');
const assert = require('node:assert/strict');
const { once } = require('node:events');
const { createServer } = require('../examples/minimal-oauth-service/server');
const admin = 'synthetic-admin-' + 'a'.repeat(32);

async function fixture(t, options = {}) {
  const server = createServer(options);
  server.listen(0, '127.0.0.1'); await once(server, 'listening');
  t.after(() => new Promise(resolve => { server.closeAllConnections(); server.close(resolve); }));
  const base = 'http://127.0.0.1:' + server.address().port;
  return {
    base,
    start: async () => {
      const response = await fetch(base + '/oauth/start', { redirect: 'manual' });
      const url = new URL(response.headers.get('location'));
      if (!url.searchParams.has('code')) url.searchParams.set('code', 'synthetic-code');
      return { callback: base + '/oauth/callback?' + url.searchParams.toString(), cookie: response.headers.get('set-cookie').split(';')[0], url };
    },
    status: (portal = 'demo-portal', key = admin) => fetch(base + '/oauth/status?portalId=' + portal, { headers: { authorization: 'Bearer ' + key } }),
    post: (action, portal = 'demo-portal') => fetch(base + '/oauth/' + action, { method: 'POST', headers: { authorization: 'Bearer ' + admin, 'content-type': 'application/json' }, body: JSON.stringify({ portalId: portal }) })
  };
}
test('offline OAuth lifecycle and browser binding', async t => {
  let now = 1700000000000;
  const f = await fixture(t, { env: { USE_MOCK_DATA: 'true', OAUTH_ADMIN_SECRET: admin }, now: () => now, fetchImpl: () => { throw new Error('No network allowed'); } });
  const first = await f.start();
  await t.test('management requires authentication and exact account', async () => {
    assert.equal((await f.status('demo-portal', '')).status, 401);
    assert.equal((await f.status('other-account')).status, 403);
    assert.equal((await f.post('revoke', 'other-account')).status, 403);
  });
  await t.test('state requires the initiating browser', async () => assert.equal((await fetch(first.callback)).status, 400));
  await t.test('tampered state rejected', async () => assert.equal((await fetch(first.callback + 'x', { headers: { cookie: first.cookie } })).status, 400));
  await t.test('valid callback installs without exposing tokens', async () => {
    const response = await fetch(first.callback, { headers: { cookie: first.cookie } });
    assert.equal(response.status, 200); assert.ok(!(await response.text()).includes('synthetic-access'));
    assert.equal((await (await f.status()).json()).connected, true);
  });
  await t.test('callback cannot be replayed', async () => assert.equal((await fetch(first.callback, { headers: { cookie: first.cookie } })).status, 400));
  await t.test('refresh and revoke complete; second revoke reports missing', async () => {
    assert.equal((await f.post('refresh')).status, 200);
    assert.equal((await f.post('revoke')).status, 200);
    assert.equal((await (await f.status()).json()).connected, false);
    assert.equal((await f.post('revoke')).status, 404);
  });
  await t.test('expired state rejected', async () => {
    const flow = await f.start(); now += 600001;
    assert.equal((await fetch(flow.callback, { headers: { cookie: flow.cookie } })).status, 400);
  });
});
test('live transport tested with synthetic responses, never live HubSpot', async t => {
  const env = { USE_MOCK_DATA: 'false', HUBSPOT_PORTAL_ID: '12345', HUBSPOT_CLIENT_ID: 'synthetic-client', HUBSPOT_CLIENT_SECRET: 'synthetic-client-secret', OAUTH_STATE_SECRET: 's'.repeat(32), OAUTH_ADMIN_SECRET: admin };
  let fail = false;
  const fields = [];
  const f = await fixture(t, { env, fetchImpl: async (url, options) => {
    assert.ok(String(url).startsWith('https://api.hubapi.com/oauth/2026-09/token'));
    const body = Object.fromEntries(options.body); fields.push(body);
    if (fail) return new Response('{}', { status: 401 });
    if (String(url).endsWith('/revoke')) return new Response(null, { status: 204 });
    return Response.json({ hub_id: 12345, access_token: 'synthetic-access', ...(body.grant_type === 'authorization_code' ? { refresh_token: 'synthetic-refresh' } : {}), expires_in: 1800, scopes: ['crm.objects.contacts.read'] });
  } });
  const flow = await f.start();
  assert.equal(flow.url.origin, 'https://app.hubspot.com');
  assert.equal((await fetch(flow.callback, { headers: { cookie: flow.cookie } })).status, 200);
  await t.test('refresh preserves refresh token if no replacement supplied', async () => {
    assert.equal((await f.post('refresh', '12345')).status, 200);
    assert.equal((await f.post('refresh', '12345')).status, 200);
    assert.equal(fields.at(-1).refresh_token, 'synthetic-refresh');
  });
  await t.test('failed revoke retains the installation for recovery', async () => {
    fail = true; assert.equal((await f.post('revoke', '12345')).status, 502);
    assert.equal((await (await f.status('12345')).json()).connected, true);
    fail = false; assert.equal((await f.post('revoke', '12345')).status, 200);
  });
});
test('startup rejects production memory storage and incomplete live configuration', () => {
  assert.throws(() => createServer({ env: { NODE_ENV: 'production' } }), /cannot run in production/);
  assert.throws(() => createServer({ env: { USE_MOCK_DATA: 'false' } }), /Live mode requires/);
  assert.throws(() => createServer({ env: { HUBSPOT_REDIRECT_URI: 'https://untrusted.example.com/oauth/callback' } }), /loopback/);
});
