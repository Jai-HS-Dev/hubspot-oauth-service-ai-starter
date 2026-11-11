# Local OAuth Lifecycle Example

**Example status:** Runnable locally.
**Local check:** `npm run smoke:example` from the repository root, after the documented setup.
**Developer-account verification:** Not verified.
**Production prerequisites:** Review [the checklist](../../docs/REAL_TOOL_CHECKLIST.md) and [evidence](../../docs/EVIDENCE.md); no production implementation is included.

Offline mock by default; in-memory local teaching service, not a production broker.


A hosting-neutral learning example using Node built-ins only. **Mock mode is the
default**, and performs no HubSpot requests. This is not a deployable production
OAuth broker: tokens and pending state are in memory and disappear on restart.
NODE_ENV=production is refused. The listener binds only to 127.0.0.1.

## First Working Run

From the repository root, run these without credentials or npm install:

```powershell
npm.cmd run smoke:example
npm.cmd test
```

The smoke test now runs the full offline start/callback/refresh/revoke flow and
rejects an unbound callback, replay and unauthenticated status access. The unit
suite also injects synthetic upstream responses and exercises failures. Neither
contacts HubSpot.

For an interactive mock, enter this example directory and run `node server.js`.
Open http://127.0.0.1:3000/oauth/start in a normal browser. You will be connected to
**demo-portal**, not your real HubSpot account. No admin secret means management
routes remain disabled. To configure them, copy .env.example to ignored .env,
set a locally generated OAUTH_ADMIN_SECRET of at least 32 characters, and use
`npm.cmd start`. Never paste the value in chat or a public issue.

## What The Routes Do

| Route | Access and behavior |
| --- | --- |
| GET /oauth/start | New random browser-bound, signed, ten-minute state; mock redirects locally |
| GET /oauth/callback | Requires same browser cookie and unused state before token exchange |
| GET /oauth/status?portalId=... | Requires server-side Bearer admin secret and exact configured account |
| POST /oauth/refresh | Same admin auth; JSON body contains only portalId; no tokens returned |
| POST /oauth/revoke | Same admin auth; upstream success required before local deletion |

The admin secret is a trusted single-operator **server credential**, not an
end-user login. Never send it from card/browser JavaScript. A portalId supplied by
a caller does not prove authorization. This demo deliberately permits only one
configured account; implement authenticated, per-tenant management for real apps.
No CORS access is enabled. Return URLs and caller-supplied hosts are not trusted.

## Optional Local Live OAuth Test

Only after explicit approval for your developer app/account:

1. Keep this service on loopback. Use its exact registered callback URL.
2. Copy .env.example to ignored .env. Set USE_MOCK_DATA=false, your developer
   client ID/secret, HUBSPOT_PORTAL_ID and minimal HUBSPOT_SCOPES.
3. Generate separate OAUTH_STATE_SECRET and OAUTH_ADMIN_SECRET (32+ characters).
   Neither may reuse the app client secret. Keep all values out of chat/Git/logs.
4. Run `npm.cmd start` in this directory and authorize through your browser.
5. Use your approved server-side client for status/refresh/revoke; verify the
   intended account. A token response for a different account is refused.

Requests use a ten-second timeout and the centralized 2026-09 OAuth endpoints.
The callback reports no codes or tokens. Refresh preserves an existing refresh
token when no replacement is supplied. A failed revoke retains the installation
for recovery; it does not claim success.

## Before Hosting Or Real Users

Replace in-memory maps with encrypted durable tenant storage, atomic one-use
state, authenticated installation sessions, per-user/tenant authorization,
distributed refresh locking, retry/recovery policies, uninstall handling,
rate limits and safe audit logs. Configure HTTPS and Secure cookies on the actual
host. The loopback-only cookie here is intentionally not a production cookie.
The old memory-token-store.js is retained as a reference, but server.js uses its
own isolated store per server instance. Do not deploy this file by merely changing
NODE_ENV or the listener address. See ../../docs/EVIDENCE.md and the real-tool checklist.

[Official OAuth guide](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/authentication/oauth/working-with-oauth)

