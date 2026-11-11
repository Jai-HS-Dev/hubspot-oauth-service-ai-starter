// Operator-only client. The destination is loopback; secrets stay in the process.
async function manageLocal(command, env = process.env) {
  if (!['status', 'disconnect'].includes(command)) {
    throw new Error('Choose status or disconnect.');
  }
  const mock = env.USE_MOCK_DATA === undefined || env.USE_MOCK_DATA === 'true';
  if (!mock && env.USE_MOCK_DATA !== 'false') throw new Error('Invalid USE_MOCK_DATA.');
  const portalId = mock ? 'demo-portal' : env.HUBSPOT_PORTAL_ID;
  const secret = env.OAUTH_ADMIN_SECRET || '';
  const port = Number(env.PORT || 3000);
  if (!portalId || (!mock && !/^\d+$/.test(portalId)) || secret.length < 32 ||
      !Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('Check the local account, port, and admin secret settings.');
  }
  const base = `http://127.0.0.1:${port}`;
  const headers = { authorization: 'Bearer ' + secret };
  async function request(route, options = {}) {
    const response = await fetch(base + route, {
      ...options, redirect: 'error', signal: AbortSignal.timeout(15000)
    });
    if (!response.ok) throw new Error(`Local OAuth request returned HTTP ${response.status}.`);
    const result = await response.json();
    if (result?.mock !== mock) throw new Error('Running server mode does not match local settings.');
    return result;
  }
  async function status() {
    const result = await request('/oauth/status?portalId=' + encodeURIComponent(portalId), { headers });
    if (typeof result.connected !== 'boolean') throw new Error('Unexpected local status response.');
    return { connected: result.connected, mock };
  }
  const before = await status();
  if (command === 'status') return before;
  if (!before.connected) throw new Error('No current installation; revocation was not verified.');
  const result = await request('/oauth/revoke', {
    method: 'POST',
    headers: { ...headers, 'content-type': 'application/json' },
    body: JSON.stringify({ portalId })
  });
  if (result.revoked !== true) throw new Error('The service did not confirm revocation.');
  const after = await status();
  if (after.connected) throw new Error('Disconnect could not be verified.');
  return after;
}

if (require.main === module) {
  manageLocal(process.argv[2]).then(
    result => console.log(JSON.stringify(result)),
    () => {
      console.error('Could not verify the connection state. Check the local server, mode and settings privately.');
      process.exitCode = 1;
    }
  );
}

module.exports = { manageLocal };
