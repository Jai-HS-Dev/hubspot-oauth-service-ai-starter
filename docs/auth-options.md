# Auth Options

HubSpot projects can use several auth patterns. Choose based on the real risk and audience.

## No Auth

Use when a card or demo shows safe static content, mock data, or public information and does not call private APIs.

## Mock Mode

Use fake data while designing behavior. This is the safest default for AI-assisted work.

## Service Key For One Account

Use a scoped HubSpot Service Key for a new admin-owned, single-account system integration when the target portal supports it. Store it only in a server-side secret manager. Service Keys are public beta in platform `2026.09`, so keep a tested fallback until the feature is available for the target account.

## Legacy Private App Token

Use only to maintain or migrate an existing installation. Do not make a new private app token the default path in generated code or beginner instructions.

## HubSpot Serverless Function Context

Useful for app cards and project functions where HubSpot provides the runtime context. Keep sensitive work server-side and avoid exposing tokens to browser code.

## External Endpoint With Shared Secret Or Signature Validation

Useful for workflow actions or tool endpoints called from HubSpot. Validate requests server-side and avoid putting secrets in URLs.

## OAuth-Backed Service

Best for distributed apps. Requires install, callback, state validation, token exchange, token storage, refresh, revoke, and uninstall handling.

## Checks For Every Auth Path

- Keep secrets out of browser code.
- Validate input before calling HubSpot or external APIs.
- Request minimum scopes.
- Avoid logging private CRM data.
- Keep error messages helpful but limited.
- Provide a revoke or uninstall path when tokens are stored.

## AI Safety Rule

The AI assistant should explain which auth path is being used before writing code that touches real HubSpot data.
