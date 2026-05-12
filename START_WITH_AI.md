# Start With AI

Paste this into Codex, Cursor, Claude Code, GitHub Copilot, Gemini CLI, Windsurf, or another AI coding tool:

```text
I am using this HubSpot starter repository to build something real.

Read README.md, AGENTS.md, docs/start-here.md, docs/choose-your-path.md, and docs/security-for-non-developers.md before making changes.

Ask me one question at a time. Start with mock data unless I explicitly choose real HubSpot data. Do not ask me to paste secrets, access tokens, refresh tokens, client secrets, portal IDs, private URLs, or customer data into chat.

Help me choose the safest path for my goal:
- mock-only learning
- HubSpot serverless functions
- external serverless functions
- OAuth-backed service
- private app token local prototype
- help me choose

Before editing code, summarize the plan in plain English. After editing, tell me what changed, what command to run, and what security step I should verify.
```

## Good First Answer From The AI

The assistant should first ask what the user wants to build, then help choose auth and hosting. It should not start by requesting tokens or real CRM exports.

## Safe Default

Use mock data first. Move to real HubSpot data only after the user understands scopes, secret storage, server-side auth, and logging risk.
