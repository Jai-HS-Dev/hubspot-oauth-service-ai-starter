# OAuth Flow

This is the high-level flow an AI coding tool should explain before building.

## 1. Start Authorization

The app sends the user to HubSpot's authorization page with:

- client ID
- redirect URI
- requested scopes
- `state`

The `state` value helps protect against callback tampering.

## 2. Callback

HubSpot redirects back to the app with an authorization code.

The server validates `state` before exchanging the code.

## 3. Token Exchange

The server exchanges the code for tokens using the OAuth client secret.

The client secret must stay server-side.

## 4. Token Storage

Store refresh tokens securely on the server side. Do not store them in browser local storage, public JavaScript, issue comments, or AI chat.

## 5. Refresh

When an access token expires, the server uses the refresh token to request a new access token.

## 6. Revoke Or Uninstall

When access is removed, revoke tokens or delete installation records as appropriate for the app design.

