# HubSpot OAuth Service AI Starter

Plan and build a server-side OAuth service for HubSpot apps with help from any AI coding tool.

**Guided starter, not a finished production integration.**

**Your first result:** Run an offline install, callback, refresh and revoke simulation, and write a plan for the authorization your feature actually needs. An offline OAuth lifecycle passes, including browser binding and replay rejection. No real account is connected.


This starter is for three kinds of users:

- Non-developers who need plain-English guidance and safe defaults.
- Vibe coders who want to prototype install/auth flows without leaking secrets.
- Developers who want portable OAuth patterns, clear contracts, and smoke checks.

This repo is AI-tool-neutral and hosting-neutral. It can be used with Codex, Cursor, Claude Code, GitHub Copilot, Gemini CLI, Windsurf, or another coding assistant. It can be adapted to Cloudflare, Vercel, Netlify, Railway, Render, AWS, Azure, Google Cloud, a VPS, or another backend host.

## Quick Start

Follow [your first working result](docs/start-here.md): describe your goal, run the
credential-free mock, choose auth/hosting only if needed, make one small change,
and verify what is still unfinished. No account connection is needed to begin.

Using an assistant? Open [START_WITH_AI.md](START_WITH_AI.md). It should ask one
plain-language question at a time. The walkthrough includes Windows commands,
expected output, stop instructions and [safe recovery](docs/troubleshooting.md).

Experienced developers can jump to [architecture](docs/developer-architecture.md)
and [the contract](docs/contracts/oauth-installation-contract.md); the same evidence and safety limits apply.

## Current HubSpot Baseline

Read [EVIDENCE.md](EVIDENCE.md) for exactly what is implemented, tested locally,
and still needs developer-account or production verification. Run `npm test`
after setup as well as the smoke check; the two checks cover different behavior.
For behavior changes in existing copies, read [UPGRADE_NOTES.md](UPGRADE_NOTES.md).

This starter targets HubSpot OAuth API `2026-09` and Node.js 22+. Read `COMPATIBILITY.md` before choosing an account model or host, and use `MIGRATION.md` when updating older code. OAuth remains the default for reusable or multi-account apps; eligible single-account system integrations should evaluate Service Keys.

User-level app, Service Key, and connected-app operational recipes are in `docs/fall-2026-feature-recipes.md`.

Node.js 22+ above describes local examples, not every managed HubSpot runtime.
Workflow custom code now needs Node.js 24 async-return handlers. See
`MIGRATION.md` for the November editing deadlines and `COMPATIBILITY.md` for
the distinction between project functions, workflow actions, and external hosts.

## Pick Your Path

| You want | Start here |
| --- | --- |
| A first result without coding experience | [One guided walkthrough](docs/start-here.md) |
| A small feature to adapt with AI | The same walkthrough, then [recipes](recipes/README.md) |
| Contracts and implementation details | [Architecture](docs/developer-architecture.md) and [contracts](docs/contracts/oauth-installation-contract.md) |

[Choose your scope](docs/choose-your-path.md) before combining repositories. One
starter may be enough; companions are optional, not an installation bundle.

## If You Are An AI Coding Tool

[AGENTS.md](AGENTS.md) is the canonical operating guidance.
[START_WITH_AI.md](START_WITH_AI.md) starts the conversation; README.md explains
scope; [docs/start-here.md](docs/start-here.md) is the beginner path.
Read the selected example, [catalog](examples/catalog.json) and [evidence](EVIDENCE.md)
before claiming anything is implemented. Tool-specific adapters delegate to AGENTS.md.

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
- `/oauth/refresh`
- `/oauth/revoke`
- signed OAuth `state`
- placeholder environment variables
- in-memory token storage for learning only

Before real users, replace the in-memory store with durable protected storage and review scopes, logs, revocation, uninstall behavior, and hosting security.

## Example Labels

[examples/catalog.json](examples/catalog.json) lists every example and its limits.
**Runnable locally** means the stated mock/offline check runs after its documented
setup. **Illustrative** means a pattern or scaffold, not a complete runnable or
deployable integration. **Developer-account verified** requires recorded installed
evidence; none of these examples currently claims it. **Production prerequisites**
are work to review, not a certification or an included production service.

| Example | Status | What the local evidence covers |
| --- | --- | --- |
| [examples/minimal-oauth-service](examples/minimal-oauth-service/README.md) | Runnable locally | Offline mock by default; in-memory local teaching service, not a production broker. |

Use [EVIDENCE.md](EVIDENCE.md) for the current verification record. Every example's
README also states its status and points to the remaining live-use checklist.

## Security First

OAuth still needs careful security:

- validate `state` during callbacks
- store tokens server-side only
- protect stored refresh tokens
- request the minimum scopes needed
- never expose access tokens to browser code
- avoid logging secrets or full CRM records
- support revoke or uninstall behavior

## From Demo To Your Feature

Keep the [single guided path](docs/start-here.md): goal, mock, auth/hosting decision,
one small build, verification. You may stop at mock-only learning. Before real use,
finish [the checklist](REAL_TOOL_CHECKLIST.md) and obtain scoped approval; successful
mock tests are not a deployment or permission to touch live data.

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

The MIT license includes the warranty disclaimers and liability limitations in [LICENSE](LICENSE). This starter is not legal advice, a security audit, a compliance review, HubSpot approval, marketplace approval, or a production guarantee. Builders are responsible for reviewing, configuring, testing, and operating their implementations.

Before using generated code with real HubSpot data or real users, review `docs/implementation-responsibility.md`, `REAL_TOOL_CHECKLIST.md`, and `docs/non-developer-safety-gates.md`. Builders are responsible for checking their own HubSpot developer requirements, auth model, scopes, hosting setup, token storage, privacy obligations, platform terms, and production readiness.
