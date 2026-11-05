const http = require('node:http');
const crypto = require('node:crypto');

// Local teaching service only. Production requires durable encrypted storage,
// authenticated installation sessions, per-tenant authorization and refresh locks.
function createServer({ env = process.env, fetchImpl = fetch, now = Date.now } = {}) {
  if (env.NODE_ENV === 'production') throw new Error('In-memory OAuth example cannot run in production');
  const mock = env.USE_MOCK_DATA === undefined || env.USE_MOCK_DATA === 'true';
  if (!mock && env.USE_MOCK_DATA !== 'false') throw new Error('USE_MOCK_DATA must be true or false');
  const version = env.HUBSPOT_API_VERSION || '2026-09';
  if (!/^\d{4}-\d{2}$/.test(version)) throw new Error('Invalid API version');
  const redirectUri = env.HUBSPOT_REDIRECT_URI || 'http://127.0.0.1:3000/oauth/callback';
  const callback = new URL(redirectUri);
  if (callback.protocol !== 'http:' || !['localhost', '127.0.0.1'].includes(callback.hostname) ||
      callback.pathname !== '/oauth/callback' || callback.search || callback.hash || callback.username || callback.password) {
    throw new Error('This local example requires an exact loopback /oauth/callback redirect URI');
  }
  const allowedPortal = mock ? 'demo-portal' : env.HUBSPOT_PORTAL_ID;
  if (!mock && (!/^\d+$/.test(allowedPortal || '') || !env.HUBSPOT_CLIENT_ID || !env.HUBSPOT_CLIENT_SECRET ||
      (env.OAUTH_STATE_SECRET || '').length < 32 || (env.OAUTH_ADMIN_SECRET || '').length < 32)) {
    throw new Error('Live mode requires client credentials, a portal ID, and separate state/admin secrets of at least 32 characters');
  }
  if (!mock && new Set([env.OAUTH_STATE_SECRET, env.OAUTH_ADMIN_SECRET, env.HUBSPOT_CLIENT_SECRET]).size !== 3) {
    throw new Error('State, admin and client secrets must be distinct');
  }
  const stateSecret = env.OAUTH_STATE_SECRET || crypto.randomBytes(32).toString('hex');
  const installs = new Map(), pending = new Map();
  const ttl = 600000;
  const cookieName = 'oauth_binding';
  const cookieOptions = 'HttpOnly; SameSite=Lax; Path=/oauth/callback';
  const equals = (a, b) => {
    const left = Buffer.from(String(a || '')), right = Buffer.from(String(b || ''));
    return left.length === right.length && crypto.timingSafeEqual(left, right);
  };
  const mac = (body) => crypto.createHmac('sha256', stateSecret).update(body).digest('base64url');
  async function tokenRequest(fields, revoke = false) {
    const response = await fetchImpl(`https://api.hubapi.com/oauth/${version}/token${revoke ? '/revoke' : ''}`, {
      method: 'POST', redirect: 'error', headers: { 'content-type': 'application/x-www-form-urlencoded' },
      signal: AbortSignal.timeout(10000),
      body: new URLSearchParams({ client_id: env.HUBSPOT_CLIENT_ID, client_secret: env.HUBSPOT_CLIENT_SECRET, ...fields })
    });
    if (!response.ok) throw new Error('OAuth upstream unavailable');
    return revoke ? null : response.json();
  }
  function store(tokens, previous) {
    if (String(tokens.hub_id || previous?.portalId || '') !== allowedPortal ||
        typeof tokens.access_token !== 'string' || !tokens.access_token ||
        (!tokens.refresh_token && !previous?.refreshToken) ||
        !Number.isFinite(tokens.expires_in) || tokens.expires_in <= 0) throw new Error('Invalid token response or unexpected account');
    const installation = {
      portalId: allowedPortal, accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token || previous.refreshToken,
      scopes: Array.isArray(tokens.scopes) ? tokens.scopes.filter(x => typeof x === 'string') : previous?.scopes || [],
      expiresAt: new Date(now() + tokens.expires_in * 1000).toISOString()
    };
    installs.set(allowedPortal, installation);
  }
  return http.createServer(async (request, response) => {
    const send = (status, body, headers = {}) => {
      response.writeHead(status, { 'content-type': 'application/json', 'cache-control': 'no-store', 'referrer-policy': 'no-referrer', ...headers });
      response.end(JSON.stringify(body));
    };
    try {
      const url = new URL(request.url, callback.origin);
      if (request.method === 'GET' && url.pathname === '/') return send(200, { ok: true, mock, routes: ['/oauth/start', '/oauth/callback', '/oauth/status', '/oauth/refresh', '/oauth/revoke'] });
      if (request.method === 'GET' && url.pathname === '/oauth/start') {
        for (const [key, value] of pending) if (now() - value.ts > ttl) pending.delete(key);
        if (pending.size >= 1000) return send(429, { error: 'Too many pending installations' });
        const nonce = crypto.randomBytes(32).toString('base64url');
        const body = Buffer.from(JSON.stringify({ nonce, ts: now() })).toString('base64url');
        const state = body + '.' + mac(body);
        pending.set(nonce, { state, ts: now() });
        const destination = new URL(mock ? redirectUri : 'https://app.hubspot.com/oauth/authorize');
        if (mock) destination.searchParams.set('code', 'demo-code');
        else {
          destination.searchParams.set('client_id', env.HUBSPOT_CLIENT_ID);
          destination.searchParams.set('redirect_uri', redirectUri);
          destination.searchParams.set('scope', env.HUBSPOT_SCOPES || 'crm.objects.contacts.read');
        }
        destination.searchParams.set('state', state);
        response.writeHead(302, { location: destination.href, 'cache-control': 'no-store', 'set-cookie': `${cookieName}=${nonce}; Max-Age=600; ${cookieOptions}` });
        return response.end();
      }
      if (request.method === 'GET' && url.pathname === '/oauth/callback') {
        const state = url.searchParams.get('state') || '';
        const parts = state.split('.');
        if (parts.length !== 2 || !equals(mac(parts[0]), parts[1])) return send(400, { error: 'Invalid OAuth state' });
        let parsed;
        try { parsed = JSON.parse(Buffer.from(parts[0], 'base64url').toString()); } catch { return send(400, { error: 'Invalid OAuth state' }); }
        const binding = String(request.headers.cookie || '').split(';').map(x => x.trim()).filter(x => x.startsWith(cookieName + '='));
        const saved = pending.get(parsed.nonce);
        if (!saved || saved.state !== state || now() < saved.ts || now() - saved.ts > ttl ||
            binding.length !== 1 || !equals(binding[0].slice(cookieName.length + 1), parsed.nonce)) return send(400, { error: 'Expired, replayed or browser-unbound state' });
        pending.delete(parsed.nonce); // Consume before exchange, including upstream failure.
        if (url.searchParams.has('error') || url.searchParams.getAll('code').length !== 1 ||
            url.searchParams.getAll('state').length !== 1 || !url.searchParams.get('code')) return send(400, { error: 'Authorization was not completed' });
        const tokens = mock ? { hub_id: allowedPortal, access_token: 'synthetic-access', refresh_token: 'synthetic-refresh', expires_in: 1800, scopes: ['crm.objects.contacts.read'] }
          : await tokenRequest({ grant_type: 'authorization_code', code: url.searchParams.get('code'), redirect_uri: redirectUri });
        store(tokens);
        return send(200, { connected: true, mock }, { 'set-cookie': `${cookieName}=; Max-Age=0; ${cookieOptions}` });
      }
      const route = url.pathname;
      if (!['/oauth/status', '/oauth/refresh', '/oauth/revoke'].includes(route)) return send(404, { error: 'Not found' });
      if (request.method !== (route === '/oauth/status' ? 'GET' : 'POST')) return send(405, { error: 'Method not allowed' });
      const admin = env.OAUTH_ADMIN_SECRET || '';
      if (admin.length < 32 || !equals(request.headers.authorization, 'Bearer ' + admin)) return send(401, { error: 'Unauthorized' });
      let portalId;
      if (route === '/oauth/status') {
        if (url.searchParams.getAll('portalId').length !== 1) return send(400, { error: 'One portalId is required' });
        portalId = url.searchParams.get('portalId');
      } else {
        if (String(request.headers['content-type']).split(';')[0] !== 'application/json') return send(415, { error: 'Expected application/json' });
        const chunks = [];
        let size = 0;
        for await (const chunk of request) {
          size += chunk.length;
          if (size > 4096) return send(413, { error: 'Request too large' });
          chunks.push(chunk);
        }
        let body;
        try { body = JSON.parse(Buffer.concat(chunks).toString()); } catch { return send(400, { error: 'Invalid JSON' }); }
        if (!body || Object.keys(body).length !== 1 || typeof body.portalId !== 'string') return send(400, { error: 'Only portalId is accepted' });
        portalId = body.portalId;
      }
      if (portalId !== allowedPortal) return send(403, { error: 'Account not authorized' });
      const installation = installs.get(portalId);
      if (route === '/oauth/status') return send(200, { connected: !!installation, mock, scopes: installation?.scopes || [], expiresAt: installation?.expiresAt || '' });
      if (!installation) return send(404, { error: 'Installation not found' });
      if (route === '/oauth/refresh') {
        const tokens = mock ? { hub_id: allowedPortal, access_token: 'synthetic-refreshed', expires_in: 1800 }
          : await tokenRequest({ grant_type: 'refresh_token', refresh_token: installation.refreshToken });
        store(tokens, installation);
        return send(200, { refreshed: true, mock });
      }
      if (!mock) await tokenRequest({ token: installation.refreshToken, token_type_hint: 'refresh_token' }, true);
      installs.delete(portalId);
      return send(200, { revoked: true, mock });
    } catch { return send(502, { error: 'OAuth operation failed; installation state was not reported as successful' }); }
  });
}
function startServer(port = Number(process.env.PORT || 3000)) {
  return createServer().listen(port, '127.0.0.1');
}
if (require.main === module) startServer();
module.exports = { createServer, startServer };
