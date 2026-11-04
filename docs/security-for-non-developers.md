# Security For Non-Developers

## Optional AI Connector Access

Do not enable Sensitive Data access just to finish setup. Require explicit admin
approval, permitted data use, minimum permissions, and safe log retention first.
The beta gives Remote MCP read-only Sensitive Data engagements, not Sensitive Data
properties; Highly Sensitive Data properties remain restricted. Engagement writes
through AI connectors are blocked in accounts with Sensitive Data enabled, even if
a write tool or permission is visible. Never retry by broadening access.

These are AI-connector restrictions, not a new authentication model for your
backend app. Reconnection for this beta needs approval; do not disconnect a
working connector automatically. See [HubSpot's permission guide](https://knowledge.hubspot.com/account-security/configure-ai-connector-access-sensitive-data).

## Everyday Safety

OAuth secrets and tokens are software passwords.

Do not paste these into AI chat:

- OAuth client secret
- access token
- refresh token
- private app token
- database URL
- hosting provider token
- customer data

Use placeholders when talking to an AI assistant:

```text
HUBSPOT_CLIENT_SECRET=<stored in hosting secret manager>
```

If you accidentally publish a secret, rotate or revoke it immediately. Deleting it from the file is not enough if it was committed to git history or posted publicly.

