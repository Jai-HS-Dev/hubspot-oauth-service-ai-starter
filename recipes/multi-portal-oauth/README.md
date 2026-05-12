# Recipe: Multi-Portal OAuth Service

Build an OAuth service that can support more than one HubSpot account.

## Required Behaviors

- Start install with a signed `state` value.
- Validate `state` on callback.
- Exchange code server-side.
- Store refresh tokens securely.
- Associate installations with portal or account identity.
- Provide status, revoke, and uninstall behavior.

## Data Model Placeholder

```json
{
  "portalId": "example-portal-id",
  "scope": "crm.objects.contacts.read",
  "refreshTokenRef": "secret-store-or-encrypted-reference",
  "createdAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-01-01T00:00:00.000Z"
}
```

## Prompt

```text
Use the multi-portal OAuth recipe. Keep tokens server-side. Do not ask me to paste secrets. Add storage as an adapter so I can choose a database or secret store later.
```