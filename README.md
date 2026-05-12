# HubSpot OAuth Service AI Starter

Plan and build a server-side OAuth service for HubSpot apps with help from any AI coding tool.

This starter is for three kinds of users:

- Non-developers who need plain-English guidance and safe defaults.
- Vibe coders who want to prototype install/auth flows without leaking secrets.
- Developers who want portable OAuth patterns, clear contracts, and smoke checks.

This repo is AI-tool-neutral and hosting-neutral. It can be used with Codex, Cursor, Claude Code, GitHub Copilot, Gemini CLI, Windsurf, or another coding assistant. It can be adapted to Cloudflare, Vercel, Netlify, Railway, Render, AWS, Azure, Google Cloud, a VPS, or another backend host.

## Quick Start

If you are using an AI coding tool, start here:

```text
Read START_WITH_AI.md first, then README.md, AGENTS.md, docs/start-here.md, docs/oauth-flow.md, docs/non-developer-safety-gates.md, and docs/security-for-non-developers.md.

Ask me one question at a time. Start with the local example. Do not ask me to paste secrets, client secrets, access tokens, refresh tokens, portal IDs, private URLs, or customer data into chat.

Help me plan a HubSpot OAuth service safely.
```

Then run the local checks:

```bash
npm run check:ai
npm run smoke:example
```

On Windows PowerShell, if `npm` is blocked by script policy, use:

```powershell
npm.cmd run check:ai
npm.cmd run smoke:example
```

## Pick Your Path

### I Am A Non-Developer

Start with these files:

- `START_WITH_AI.md`: paste this into your AI tool.
- `docs/oauth-flow.md`: explains OAuth in plain language.
- `docs/non-developer-safety-gates.md`: safety steps before real data.
- `docs/security-for-non-developers.md`: what never to paste into chat.
- `REAL_TOOL_CHECKLIST.md`: helps decide whether the service is ready for real use.

Your safest path is understanding the flow first, then running the local example, then choosing hosting and storage.

### I Am Vibe Coding

Start with:

- `recipes/multi-portal-oauth/`
- `recipes/token-refresh/`
- `recipes/hosting-adapters/`
- `.github/prompts/choose-auth-and-hosting.prompt.md`
- `.github/prompts/turn-mock-into-real-hubspot-api.prompt.md`

Ask your AI tool to keep OAuth logic server-side and keep hosting adapters thin.

### I Am A Developer

Start with:

- `docs/developer-architecture.md`
- `docs/contracts/oauth-installation-contract.md`
- `examples/minimal-oauth-service/`
- `scripts/ai-readiness-check.js`
- `scripts/smoke-example.js`

The included example uses in-memory token storage for learning only. Real apps need durable protected storage and a complete revoke/uninstall path.

## If You Are An AI Coding Tool

Read these first, in order:

1. `AGENTS.md`
2. `START_WITH_AI.md`
3. `docs/oauth-flow.md`
4. `docs/non-developer-safety-gates.md`
5. `docs/security-for-non-developers.md`
6. `docs/contracts/oauth-installation-contract.md`
7. The relevant `recipes/*/README.md`

Rules:

- Ask one question at a time for non-technical users.
- Do not ask for secrets in chat.
- Keep client secrets, access tokens, and refresh tokens server-side.
- Validate OAuth `state` before exchanging codes.
- Do not hard-code real portal IDs, app IDs, account IDs, private URLs, tokens, or customer data.
- Explain hosting, token storage, scopes, revoke, and uninstall before real use.
- Run `npm run check:ai` and `npm run smoke:example` after meaningful changes.

## What This Repo Is

- A beginner-friendly guide to HubSpot OAuth concepts.
- An AI-readable project structure for coding assistants.
- A runnable OAuth skeleton with signed `state`.
- A security-first reference for server-side token handling.

## What This Repo Is Not

- It is not an official HubSpot product.
- It is not affiliated with, endorsed by, or sponsored by HubSpot.
- It is not a security audit, legal recommendation, or production guarantee.
- It does not include real client IDs, client secrets, refresh tokens, deployment URLs, HubSpot account IDs, portal IDs, or customer data.

## Example Included

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

Before real users, replace the in-memory store with durable protected storage and review scopes, logs, revocation, uninstall behavior, and hosting security.

## Security First

OAuth still needs careful security:

- validate `state` during callbacks
- store tokens server-side only
- protect stored refresh tokens
- request the minimum scopes needed
- never expose access tokens to browser code
- avoid logging secrets or full CRM records
- support revoke or uninstall behavior

## Real Service Workflow

1. Start with `START_WITH_AI.md`.
2. Read `docs/oauth-flow.md`.
3. Run the local example smoke check.
4. Choose hosting using `docs/hosting-options.md`.
5. Choose storage using the OAuth recipes and contract docs.
6. Run `npm run check:ai` and `npm run smoke:example`.
7. Review `REAL_TOOL_CHECKLIST.md` before real installs.

## Repo Map

- `AGENTS.md`: primary instructions for AI coding tools.
- `START_WITH_AI.md`: first prompt for any AI coding tool.
- `.github/prompts/`: reusable AI task prompts.
- `.github/instructions/`: GitHub Copilot guidance.
- `.cursor/rules/`: Cursor guidance.
- `.windsurfrules`: Windsurf guidance.
- `docs/`: OAuth flow, safety, architecture, auth, hosting, and contracts.
- `recipes/`: OAuth implementation plans.
- `examples/`: runnable starter example.
- `scripts/`: AI readiness and smoke checks.

## License And Implementation Responsibility

This starter is released under the MIT license in `LICENSE`. That makes it permissive for learning, copying, modifying, publishing, distributing, sublicensing, and building real projects, as long as the required copyright and license notices are preserved when substantial portions are reused.

The starter is provided as-is, without warranty or liability. It is not legal advice, a security audit, a compliance review, HubSpot approval, marketplace approval, or a production guarantee.

Before using generated code with real HubSpot data or real users, review `docs/implementation-responsibility.md`, `REAL_TOOL_CHECKLIST.md`, and `docs/non-developer-safety-gates.md`. Builders are responsible for checking their own HubSpot developer requirements, auth model, scopes, hosting setup, token storage, privacy obligations, platform terms, and production readiness.

