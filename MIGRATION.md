# Migration Guide

Use this checklist when moving an older HubSpot project or AI-generated prototype into this starter.

## 1. Inventory Before Editing

- Record every HubSpot API path, auth method, scope, webhook, workflow action, card, and hosting secret.
- Identify calls using `/v1/`, `/v2/`, `/v3/`, or `/v4/`.
- Keep a tested rollback revision. Do not migrate a live app and its data model in one unreviewed change.

## 2. Move To Date-Based APIs

Use the exact path from HubSpot's official API reference. The version segment is not always in the same position:

- CRM objects: `/crm/objects/2026-09/{objectType}`
- CRM associations: `/crm/associations/2026-09/{fromObjectType}/{toObjectType}/...`
- CRM properties: `/crm/properties/2026-09/{objectType}`
- CRM owners: `/crm/owners/2026-09`
- OAuth tokens: `/oauth/2026-09/token`

Do not perform a blind text replacement. Request fields and response shapes can differ.

## 3. Handle The 2026-09 Write Contract

- Send every property and association required by the target portal's admin settings.
- Treat conditional required-property errors as actionable validation failures.
- Capture and surface the response `warnings` array.
- Preserve HubSpot's correlation ID in server logs, but do not expose credentials or private CRM payloads.
- Test create, update, association, permission-denied, and validation-failure paths in a developer account.

## 4. Modernize Authentication

- New single-account system integration: evaluate a scoped Service Key.
- Reusable or multi-account app: use OAuth.
- User-specific permissions: evaluate `isUserLevel: true`.
- Existing private app token: document it as temporary and plan migration.
- Rotate credentials after testing and after any suspected exposure.

## 5. Verify

```bash
npm run doctor
npm run check:ai
npm run smoke:example
```

Then test with synthetic records before real customer data. Review scopes, uninstall/revoke behavior, retention, logs, rate limits, retries, idempotency, and hosting rollback.

## Optional Features

App Actions and Activity Auto Associations are public beta features. Put them behind a feature flag and keep a fallback. Task Series is GA but still needs portal entitlement and recurrence-specific tests. Remote MCP users should reauthenticate when adding new scopes.

