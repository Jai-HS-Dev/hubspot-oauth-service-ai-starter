# Migration Guide

Use this checklist when moving an older HubSpot project or AI-generated prototype into this starter.

## Migration Deadlines

Reviewed on 2026-10-27. Prefer endpoint-specific notices over a general schedule.

| Surface | Deadline | Required action if used |
| --- | --- | --- |
| Pipelines API v1 | December 4, 2026 | Migrate before these endpoints stop working. |
| CRM API v4 | March 30, 2027 | Migrate before its separate, earlier end-of-support date. |
| Projects 2025.2 or older | March 2027 | Move to a supported project platform; this starter targets 2026.09. |
| API v1-v3 and legacy public/private app architecture | September 2027 | Migrate API versions and app architecture separately. |
| New legacy private app creation | Already disabled: September 28, 2026 for new accounts; October 26, 2026 for existing accounts | Use an eligible Service Key or a Projects-based app instead. |

Unsupported does not always mean immediate shutdown. Pipelines v1 is explicitly
being retired; other notices describe loss of support and Marketplace impacts.
Confirm the exact endpoint notice before planning a cutover.

Review HubSpot Development > Migrations > APIs. Warnings reflect runtime calls,
not just current source files. Verify the installed deployment and recent calls
after migrating, and retain a tested rollback.

Sources:
- [Pipelines v1 sunset](https://developers.hubspot.com/changelog/pipelines-api-v1-sunset)
- [Legacy APIs, apps, and project deadlines](https://developers.hubspot.com/changelog/legacy-apis-and-legacy-apps-whats-going-unsupported-and-when)


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
- Follow `docs/crm-write-validation-tests.md` for synthetic cases and release checks. Mock tests alone do not validate a live account's rules.

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
