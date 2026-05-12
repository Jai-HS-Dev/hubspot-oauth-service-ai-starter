# Non-Developer Safety Gates

Use these gates before moving from an idea to a real HubSpot tool.

## Gate 1: Mock First

The first working version should use mock data. This lets the AI tool help with behavior, naming, UI states, and response shapes without touching real CRM data.

You can move past this gate when:

- the mock example runs locally
- the expected input and output are documented
- the AI explains what real HubSpot data will be needed

## Gate 2: Auth Choice

Pick one auth path before calling HubSpot APIs:

- no auth for static or mock examples
- HubSpot serverless function context for simple project functions
- private app token only for local developer testing
- external endpoint validation for HubSpot-called endpoints
- OAuth-backed service for real multi-account apps

You can move past this gate when the AI explains why the chosen path fits.

## Gate 3: Secret Handling

Secrets belong in a local `.env` file, terminal environment variables, or a hosting provider secret manager. They do not belong in AI chat, GitHub issues, screenshots, README files, browser JavaScript, or committed source code.

You can move past this gate when `.env.example` contains placeholders and `.env` is ignored by Git.

## Gate 4: Minimal Scopes

Only request the HubSpot scopes needed for the feature. If the tool reads contacts, start with contact read scopes instead of broad CRM access.

You can move past this gate when the required object types, properties, and scopes are written down.

## Gate 5: Safe Logs And Errors

Logs and error messages should help debugging without exposing tokens, full CRM records, customer notes, emails, phone numbers, private URLs, or stack traces to users.

You can move past this gate when errors are helpful but limited.

## Gate 6: Real Data Dry Run

Before using real customer data, run a local check or smoke test with sample IDs and confirm the response shape still matches the contract.

You can move past this gate when the AI can explain what changed from mock mode to real mode.