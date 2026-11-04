# Compatibility

This starter is aligned with HubSpot's Fall 2026 developer platform.

## Supported Baseline

- HubSpot project version: `2026.09`
- HubSpot CRM API version: `2026-09`
- Node.js: 22 or newer
- AI tools: Codex, Cursor, Claude Code, GitHub Copilot, Gemini CLI, Windsurf, and tools that can read repository instructions
- Hosting: Cloudflare, Vercel, Netlify, Railway, Render, AWS, Azure, Google Cloud, a VPS, or HubSpot-hosted functions where the runtime fits

## Runtime Boundaries

| Execution surface | Runtime responsibility |
| --- | --- |
| Local examples and CLI tooling | The documented local Node.js 22+ baseline; verify each tool's requirements. |
| HubSpot project functions on 2026.03 or 2026.09 | HubSpot-managed Node.js 24, selected by platform version. |
| Workflow custom code | Select Node.js 24 per action and return outputFields without callbacks. |
| External backend or Cloudflare Worker | Provider-specific runtime; no host migration is implied by HubSpot's Design Manager sunset. |

See `MIGRATION.md` for the November 2026 editing restrictions, February 2027
Design Manager shutdown, and per-action testing steps. Local Node.js requirements
are not a claim about the runtime of every HubSpot-hosted execution surface.

## Authentication Decision

| Use case | Recommended path |
| --- | --- |
| Mocking and UI design | No real credentials |
| One account, admin-owned system integration | Scoped HubSpot Service Key |
| Multiple accounts or distributed app | OAuth with durable encrypted token storage |
| HubSpot card or UI extension calling a backend | HubSpot request signature validation plus server-side OAuth or Service Key |
| Existing private app token | Migration-only compatibility path |

Service Keys are in public beta in HubSpot platform `2026.09`. Confirm availability in the target portal before relying on them. Never expose any credential to browser code or an AI chat.

## Fall 2026 Features

| Capability | Status in this starter |
| --- | --- |
| Date-based CRM APIs | Default |
| Admin write validation and response warnings | Required handling |
| App Actions | Optional public-beta extension |
| Task Series API | Optional GA extension |
| Activity Auto Associations API | Optional public-beta extension |
| User-level apps | Optional; enable only when per-user permissions are required |
| Remote MCP expanded tools | Optional; reauthenticate to receive newly granted scopes |
| AI connector Sensitive Data beta | Explicit admin opt-in only; Remote MCP supports read-only engagements, not Sensitive Data properties. See docs/security-for-non-developers.md. |
| App `mcp-server` component | Optional; marketplace distribution requires HubSpot review |

## Project Focus

Build OAuth installation and token lifecycle services. Use PKCE where the client requires it, validate state, encrypt durable token storage, support revoke/uninstall, and keep provider-specific hosting code behind adapters.

Run `npm run doctor`, `npm run check:ai`, and `npm run smoke:example` before connecting real CRM data. A passing local check is not a production certification.

