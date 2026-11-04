# Migration Guide

Use this checklist when moving an older HubSpot project or AI-generated prototype into this starter.

## Migration Deadlines

Reviewed on 2026-11-04. Prefer endpoint-specific notices over a general schedule.

| Surface | Deadline | Required action if used |
| --- | --- | --- |
| New legacy Design Manager functions and Node.js 20 workflow custom code actions | Creation blocked November 3, 2026 | Use Developer Projects for functions; select Node.js 24 for custom code actions. |
| Existing Design Manager functions and Node.js 20 workflow custom code actions | Editing blocked November 17, 2026 | Migrate and test before edits are blocked; existing executions continue. |
| Legacy Design Manager functions | Execution stops February 1, 2027 | Rebuild in a Developer Project and update every caller. This shutdown date is not announced for workflow custom code actions. |
| Pipelines API v1 | December 4, 2026 | Migrate before these endpoints stop working. |
| CRM API v4 | March 30, 2027 | Migrate before its separate, earlier end-of-support date. |
| Projects 2025.2 | March 2027 | Move to a supported project platform; this starter targets 2026.09. |
| Projects 2025.1, 2023.2, or 2023.1 | Already sunset | Migrate before building or deploying; do not wait for March 2027. |
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
- [Function and workflow runtime sunset](https://developers.hubspot.com/changelog/sunsetting-design-manager-serverless-functions-and-older-node.js-runtimes-for-custom-code-actions)

## Runtime Migration Boundaries

HubSpot-hosted functions in Projects `2026.03` and `2026.09` already run on
managed Node.js 24. Workflow custom code selects its runtime per action: remove
the callback parameter and return `{ outputFields: ... }` from every completion
path, await asynchronous work, and check the runtime's supplied library versions.
Changing this repo does not update workflow code already pasted into HubSpot.

Legacy Design Manager endpoints under `/_hcms/api/` need a project migration
with caller updates to `/hs/serverless/`, tested responses, and a rollback plan.
The repo's local Node.js minimum and an external host's runtime are separate;
do not move hosting or change Cloudflare compatibility settings just for this notice.
Test with synthetic data and approval before updating real workflows or callers.


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

- Supply required creation properties and conditional properties enforced by the API.
- HubSpot's October 27 correction says required creation associations remain UI-only. If your app requires a link, validate and create it explicitly, then verify it; do not assume HubSpot rejects an API create without it.
- Test Edit Associations permissions for user-level OAuth separately; this restriction does not affect portal-level app tokens.
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
