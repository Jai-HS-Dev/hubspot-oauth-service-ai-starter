# Minimal HubSpot OAuth Service

This example shows a real OAuth service shape without tying the user to one hosting provider.

It uses Node built-ins only and stores installations in memory for learning. In-memory storage resets when the process restarts and is not production storage.

## Routes

- `GET /oauth/start`
- `GET /oauth/callback`
- `GET /oauth/status?portalId=...`
- `POST /oauth/revoke`

## Try Locally

```bash
cp .env.example .env
npm start
```

Open:

```text
http://localhost:3000/oauth/start
```

Do not paste your `HUBSPOT_CLIENT_SECRET` into AI chat. Put it in `.env` locally or in your hosting provider secret manager.

## Required Environment Variables

```text
HUBSPOT_CLIENT_ID=
HUBSPOT_CLIENT_SECRET=
HUBSPOT_REDIRECT_URI=http://localhost:3000/oauth/callback
HUBSPOT_SCOPES=crm.objects.contacts.read
OAUTH_STATE_SECRET=
```

## Hosting

This can be adapted to Cloudflare Workers, Vercel Functions, Railway, Render, AWS, Azure, Google Cloud, or another backend host.

For any host, configure secrets in the host's secret manager. Do not commit `.env`.

## Before Real Users

- Replace `memory-token-store.js` with encrypted durable storage.
- Add uninstall handling if the app needs it.
- Add CSRF/state expiry checks appropriate for your app.
- Keep tokens server-side.
- Request minimum scopes.
- Avoid logging OAuth codes, access tokens, refresh tokens, or full CRM records.

