# OAuth Installation Contract

OAuth-backed apps need to track installations without exposing tokens to the browser or AI chat.

## Installation Record

```json
{
  "portalId": "example-portal-id",
  "hubId": "example-hub-id",
  "scope": "crm.objects.contacts.read",
  "refreshTokenRef": "encrypted-or-secret-store-reference",
  "createdAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-01-01T00:00:00.000Z"
}
```

## Required Behaviors

- Validate `state` on callback.
- Exchange code server-side.
- Store refresh tokens securely.
- Refresh access tokens server-side.
- Revoke or delete installation records when access is removed.
- Never expose refresh tokens to browser code.
