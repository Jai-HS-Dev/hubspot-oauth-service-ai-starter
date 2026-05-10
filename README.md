# HubSpot OAuth Service AI Starter

This is a community starter kit for planning and building a server-side OAuth service for HubSpot apps with help from an AI coding assistant.

It is written for developers, non-developers, and vibe coders who want a safer path for app authorization, token handling, and hosted backend setup.

## What This Repo Is

- A beginner-friendly guide to HubSpot OAuth concepts.
- An AI-readable project structure for coding assistants.
- A security-first reference for server-side token handling.
- A starter reference, not a production-certified OAuth service.

## What This Repo Is Not

- It is not an official HubSpot product.
- It is not affiliated with, endorsed by, or sponsored by HubSpot.
- It is not a security audit, legal recommendation, or production guarantee.
- It does not include real client IDs, client secrets, refresh tokens, deployment URLs, HubSpot account IDs, portal IDs, or customer data.

## Start Here

Give your AI coding tool this instruction:

```text
Read this repository before making changes. Start with README.md, AGENTS.md, docs/start-here.md, docs/oauth-flow.md, and docs/security-for-non-developers.md.

Walk me step by step to plan a HubSpot OAuth service. Ask one question at a time. Do not ask me to paste secrets, client secrets, access tokens, refresh tokens, portal IDs, or customer data into chat. When secrets are needed, tell me how to enter them in my terminal, local .env file, or hosting provider secret manager.
```

## Why OAuth Matters

OAuth lets a HubSpot user authorize an app without giving the app owner a private app token from their account. For public or reusable apps, OAuth is often the right direction because it creates an install and authorization flow.

OAuth still needs careful security:

- validate `state` during callbacks
- store tokens server-side only
- encrypt or otherwise protect stored refresh tokens
- request the minimum scopes needed
- never expose access tokens to browser code
- avoid logging secrets or full CRM records

## First Decisions

- Is this for learning, a team demo, or real users?
- What HubSpot app feature needs OAuth?
- What scopes are required?
- Where will the backend run?
- How will tokens be stored?
- How will users uninstall or revoke access?

See [docs/choose-your-path.md](docs/choose-your-path.md).

## Repo Contents

- `AGENTS.md`: instructions for AI coding agents.
- `examples/minimal-oauth-service/`: a runnable hosting-neutral OAuth skeleton.
- `docs/oauth-flow.md`: plain-English OAuth flow.
- `docs/security-for-non-developers.md`: secret handling guide.
- `docs/hosting-options.md`: hosting-neutral planning notes.
- `.env.example`: placeholder-only environment variables.
- `.github/ISSUE_TEMPLATE/`: issue forms that warn users not to share secrets.

## Production Reminder

Before using an OAuth service with real customer data, validate your own scopes, token storage, encryption, hosting security, privacy requirements, logging, data retention, compliance, uninstall flow, and incident response.

## Example Included

The example is intentionally small and hosting-neutral:

```text
examples/minimal-oauth-service/
```

It includes:

- `/oauth/start`
- `/oauth/callback`
- `/oauth/status`
- `/oauth/revoke`
- signed OAuth `state`
- placeholder environment variables
- in-memory token storage for learning only

Before real users, replace the in-memory store with durable encrypted storage and review scopes, logs, revocation, uninstall behavior, and hosting security.
