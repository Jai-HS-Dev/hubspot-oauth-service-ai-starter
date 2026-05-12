# Real Tool Checklist

Use this checklist before calling a HubSpot feature a real tool.

## User Value

- The tool solves one clear HubSpot user problem.
- The result is useful inside the HubSpot workflow or CRM record where it appears.
- Empty, loading, error, and setup-required states are handled.

## AI Buildability

- The AI has a blueprint before coding.
- The request and response shapes are documented in `docs/contracts/`.
- The example works with mock data first.
- The files to edit are named clearly.
- The AI knows which files are instructions, docs, examples, and recipes.

## Security

- No secrets are committed.
- No secrets are requested in chat.
- Tokens and client secrets stay server-side.
- The minimum HubSpot scopes are documented.
- Logs avoid private CRM data.
- Request validation is present where endpoints are public.

## Developer Quality

- There is a local command to check the example.
- There is a smoke or contract check for endpoint output.
- Environment variables are documented in `.env.example`.
- Hosting assumptions are written down.
- OAuth apps include revoke or uninstall behavior when tokens are stored.