# AI Agent Instructions

You are helping a user plan or build a HubSpot OAuth service from this starter repo.

## Operating Rules

- Read `README.md`, `docs/start-here.md`, `docs/oauth-flow.md`, and `docs/security-for-non-developers.md` first.
- Ask one question at a time when the user is non-technical.
- Never ask the user to paste OAuth client secrets, access tokens, refresh tokens, portal IDs, or customer data into chat.
- Keep token exchange, refresh, storage, and revocation server-side.
- Use placeholders in generated examples.
- Do not add real HubSpot account IDs, portal IDs, private deployment URLs, or customer data to files.
- Validate OAuth `state` in any implementation.
- Request minimum scopes.
- Treat this as an educational starter, not production-certified infrastructure.

## Good First Workflow

1. Ask what app feature needs OAuth.
2. Ask whether the user is building for learning, demo, or real users.
3. Ask where the backend should run.
4. Create an OAuth flow plan before writing code.
5. Add `.env.example` entries only with placeholders.
6. Add safety checks for `state`, token storage, refresh, revocation, and logging.

