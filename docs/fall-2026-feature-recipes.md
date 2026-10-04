# Fall 2026 Feature Recipes

Choose the account model before changing the OAuth flow.

## Portal-Level OAuth

Use for reusable integrations that act for the installed account. Validate state, use the exact registered redirect URI, encrypt durable token storage, refresh server-side, and implement revoke/uninstall cleanup.

## User-Level App

Set `isUserLevel: true` only when actions must respect the installing user's exact CRM permissions. Test deactivated users, ownership transfer, missing Edit Associations permission, and reauthorization after scope changes.

## Service Key Alternative

A Service Key is not an OAuth shortcut. It is a public-beta credential for eligible admin-owned, single-account system integrations. Do not add an OAuth callback or refresh-token store when a Service Key is the selected architecture. Keep it in the host's secret manager and implement rotation.

## Connected App Operations

Assign an app owner, document the recovery owner, review the Connected Apps activity and event logs, and test uninstall/revoke. Never rely on one employee's account without a transfer procedure.

