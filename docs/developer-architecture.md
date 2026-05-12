# Developer Architecture

This starter is intentionally small, but it should still behave like a real project.

## Principles

- Keep HubSpot credentials server-side.
- Keep browser code free of tokens and client secrets.
- Start with mock data and replace it deliberately.
- Document every environment variable in `.env.example`.
- Add a check or test for every new real endpoint.
- Keep hosting adapters thin so the core behavior can move between platforms.

## Recommended Implementation Shape

- `examples/`: working starter examples.
- `recipes/`: copyable feature patterns.
- `docs/contracts/`: request and response shapes.
- `scripts/`: local checks and smoke tests.
- `tests/`: behavior tests that do not require real HubSpot data by default.

## Before Real Data

Confirm scopes, auth path, secret storage, logging, error handling, and data retention. Do not proceed by pasting CRM exports or tokens into chat.
