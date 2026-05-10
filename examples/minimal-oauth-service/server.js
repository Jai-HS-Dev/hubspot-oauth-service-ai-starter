const crypto = require('node:crypto');
const http = require('node:http');

const { deleteInstallation, getInstallation, saveInstallation } = require('./memory-token-store');

const AUTH_URL = 'https://app.hubspot.com/oauth/authorize';
const TOKEN_URL = 'https://api.hubapi.com/oauth/2026-03/token';
const REVOKE_URL = 'https://api.hubapi.com/oauth/2026-03/token/revoke';
const PORT = Number(process.env.PORT || 3000);

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`);

    if (request.method === 'GET' && url.pathname === '/') {
      return sendJson(response, 200, {
        ok: true,
        routes: [
          'GET /oauth/start',
          'GET /oauth/callback',
          'GET /oauth/status?portalId=...',
          'POST /oauth/revoke'
        ]
      });
    }

    if (request.method === 'GET' && url.pathname === '/oauth/start') {
      return redirect(response, buildAuthorizationUrl(request, url));
    }

    if (request.method === 'GET' && url.pathname === '/oauth/callback') {
      return handleCallback(request, response, url);
    }

    if (request.method === 'GET' && url.pathname === '/oauth/status') {
      return handleStatus(response, url);
    }

    if (request.method === 'POST' && url.pathname === '/oauth/revoke') {
      return handleRevoke(request, response);
    }

    return sendJson(response, 404, { error: 'Not found' });
  } catch (error) {
    console.error('OAuth example failed:', error.message);
    return sendJson(response, 500, { error: 'OAuth service error' });
  }
});

server.listen(PORT, () => {
  console.log(`OAuth example listening on http://localhost:${PORT}`);
});

function buildAuthorizationUrl(request, currentUrl) {
  const state = signState({
    ts: Date.now(),
    returnTo: currentUrl.searchParams.get('returnTo') || ''
  });

  const authUrl = new URL(AUTH_URL);
  authUrl.searchParams.set('client_id', requireEnv('HUBSPOT_CLIENT_ID'));
  authUrl.searchParams.set('redirect_uri', getRedirectUri(request));
  authUrl.searchParams.set('scope', getScopes().join(' '));
  authUrl.searchParams.set('state', state);

  const portalId = currentUrl.searchParams.get('portalId');
  if (portalId) authUrl.searchParams.set('portalId', portalId);

  return authUrl.toString();
}

async function handleCallback(request, response, url) {
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  if (!code) return sendJson(response, 400, { error: 'Missing OAuth code' });

  const parsedState = parseState(state);
  const tokens = await exchangeCodeForTokens(code, getRedirectUri(request));
  const portalId = String(tokens.hub_id || '').trim();
  if (!portalId) return sendJson(response, 400, { error: 'Missing HubSpot portal ID in token response' });

  await saveInstallation(portalId, {
    portalId,
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    scope: tokens.scope || '',
    tokenType: tokens.token_type || 'bearer',
    expiresAt: new Date(Date.now() + Number(tokens.expires_in || 0) * 1000).toISOString()
  });

  return sendHtml(response, 200, `
    <h1>HubSpot OAuth installed</h1>
    <p>Portal ${escapeHtml(portalId)} is connected for this local example.</p>
    <p>Return target: ${escapeHtml(parsedState.returnTo || 'not provided')}</p>
  `);
}

async function handleStatus(response, url) {
  const portalId = url.searchParams.get('portalId');
  if (!portalId) return sendJson(response, 400, { error: 'portalId is required' });

  const installation = await getInstallation(portalId);
  return sendJson(response, 200, {
    connected: Boolean(installation),
    portalId,
    scope: installation?.scope || '',
    expiresAt: installation?.expiresAt || ''
  });
}

async function handleRevoke(request, response) {
  const body = await readJson(request);
  const portalId = String(body.portalId || '').trim();
  if (!portalId) return sendJson(response, 400, { error: 'portalId is required' });

  const installation = await getInstallation(portalId);
  if (!installation) return sendJson(response, 200, { revoked: false, reason: 'not_found' });

  if (installation.refreshToken) {
    await revokeRefreshToken(installation.refreshToken);
  }

  await deleteInstallation(portalId);
  return sendJson(response, 200, { revoked: true, portalId });
}

async function exchangeCodeForTokens(code, redirectUri) {
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: requireEnv('HUBSPOT_CLIENT_ID'),
    client_secret: requireEnv('HUBSPOT_CLIENT_SECRET'),
    redirect_uri: redirectUri,
    code
  });

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.message || `Token exchange failed with status ${response.status}`);
  }

  return payload;
}

async function revokeRefreshToken(refreshToken) {
  const body = new URLSearchParams({
    client_id: requireEnv('HUBSPOT_CLIENT_ID'),
    client_secret: requireEnv('HUBSPOT_CLIENT_SECRET'),
    token: refreshToken,
    token_type_hint: 'refresh_token'
  });

  const response = await fetch(REVOKE_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body
  });

  if (!response.ok && response.status !== 404) {
    throw new Error(`Token revoke failed with status ${response.status}`);
  }
}

function signState(payload) {
  const body = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  const signature = crypto.createHmac('sha256', getStateSecret()).update(body).digest('base64url');
  return `${body}.${signature}`;
}

function parseState(state) {
  if (!state || !state.includes('.')) throw new Error('Invalid OAuth state');
  const [body, signature] = state.split('.', 2);
  const expected = crypto.createHmac('sha256', getStateSecret()).update(body).digest('base64url');
  if (!timingSafeEqual(signature, expected)) throw new Error('Invalid OAuth state signature');

  const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
  if (!payload.ts || Date.now() - payload.ts > 10 * 60 * 1000) {
    throw new Error('Expired OAuth state');
  }

  return payload;
}

function getStateSecret() {
  return process.env.OAUTH_STATE_SECRET || requireEnv('HUBSPOT_CLIENT_SECRET');
}

function getRedirectUri(request) {
  const configured = process.env.HUBSPOT_REDIRECT_URI;
  if (configured) return configured;
  const host = request.headers.host || `localhost:${PORT}`;
  return `http://${host}/oauth/callback`;
}

function getScopes() {
  return String(process.env.HUBSPOT_SCOPES || 'crm.objects.contacts.read')
    .split(/[,\s]+/)
    .map((scope) => scope.trim())
    .filter(Boolean);
}

function requireEnv(name) {
  const value = String(process.env[name] || '').trim();
  if (!value) throw new Error(`${name} is required`);
  return value;
}

async function readJson(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw.trim()) return {};
  return JSON.parse(raw);
}

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store'
  });
  response.end(JSON.stringify(body, null, 2));
}

function sendHtml(response, statusCode, body) {
  response.writeHead(statusCode, {
    'content-type': 'text/html; charset=utf-8',
    'cache-control': 'no-store'
  });
  response.end(`<!doctype html><html><body>${body}</body></html>`);
}

function redirect(response, location) {
  response.writeHead(302, { location, 'cache-control': 'no-store' });
  response.end();
}

function timingSafeEqual(left, right) {
  const leftBuffer = Buffer.from(String(left));
  const rightBuffer = Buffer.from(String(right));
  if (leftBuffer.length !== rightBuffer.length) return false;
  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}

