# Start Here

Use this repo to plan a HubSpot OAuth service before writing implementation code.

## Step 1: Name The App Feature

Write:

```text
This OAuth service will authorize HubSpot access for ______.
```

## Step 2: Identify The Minimum Scopes

Only request scopes needed by the app feature. Broad scopes create more risk.

## Step 3: Plan Token Storage

Refresh tokens should be stored server-side and protected. Do not put tokens in browser code, public files, logs, or AI chat.

## Step 4: Plan Uninstall And Revocation

A real app should have a way to revoke access or remove stored installation records when access is no longer needed.

