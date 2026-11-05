# Real Tool Checklist

Use this checklist before calling a HubSpot feature a real tool.

This is a builder's review aid, not certification or permission to go live.
Finishing the starter walkthrough only proves the recorded local result. See
[EVIDENCE.md](EVIDENCE.md) for the examples' actual verification limits.

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
- The full local suite passes after its documented setup; skipped checks are reported.
- Environment variables are documented in `.env.example`.
- Hosting assumptions are written down.
- OAuth apps include revoke or uninstall behavior when tokens are stored.

## Separate Live Approval

- The intended account/app/environment and synthetic test data are confirmed privately.
- The user approves the exact connection, access/write, upload or deployment operation.
- Caller, tenant and required user/record authorization are tested for allowed and denied cases.
- Actual installed behavior is checked before claiming developer-account verification.
- Production prerequisites, ownership, recovery and remaining unknowns are reviewed separately.
