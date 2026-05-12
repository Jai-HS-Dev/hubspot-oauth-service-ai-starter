# Recipe: Token Refresh Helper

Build a server-side helper that refreshes HubSpot access tokens when needed.

## Rules

- Refresh tokens never go to the browser.
- Access tokens are short-lived and used server-side only.
- Failed refresh attempts should not print tokens or full provider responses.
- If refresh fails permanently, mark the installation as needing reconnect.

## Prompt

```text
Use the token refresh recipe. Build a server-side refresh helper with safe logs, limited errors, and a clear reconnect state. Do not expose tokens to browser code.
```