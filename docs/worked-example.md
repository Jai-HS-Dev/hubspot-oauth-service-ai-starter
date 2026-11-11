# Worked Exercise: Connection And Disconnect Messages

**Scope:** Offline synthetic OAuth lifecycle. No real account is connected.
You will customize display text without exposing tokens or weakening management auth.

## 1. Run The Local Scenario

From the repository root:

```bash
npm run build:example
```

Use `npm.cmd` on Windows. No packages, environment file or credentials are needed.
The check creates a throwaway local admin credential internally; it never prints it.
It refuses external requests and closes its loopback server automatically.

The named check is:

```text
worked connection status becomes disconnected only after mock revoke succeeds
```

## 2. Follow The Result

| Step | Display text / result |
| --- | --- |
| Before mock authorization | Not connected. |
| Status request without management auth | HTTP 401; not an authorized status |
| Browser-bound mock callback succeeds | Connected (local demo). |
| Mock revoke succeeds | Not connected. |
| Invalid status object | Error, not an invented connection state |

These are synthetic expected results, not proof of a live OAuth installation.
The existing lifecycle suite also checks replay, expiry and failed revocation.

## 3. Customize One Message In Your Copy

In `tests/worked-example.test.js`, replace the expected connected message with:

```text
Demo connection ready.
```

Run `npm run example:guided`. The assertion should fail.
Now change the same connected message in
`examples/minimal-oauth-service/connection-message.js`.
Run the focused command again, then `npm test`; both should pass.

This helper is display logic only. Do not put the admin secret into browser/card
code or treat text as authentication. Do not change the server's production guard,
browser binding, one-use state or account checks.

## 4. Understand Configuration Before Connecting

The canonical server template is
`examples/minimal-oauth-service/.env.example`; the root template mirrors its
settings for reference. The server's start command reads `.env` in the example
directory, not the root. Smoke checks need neither file.

For an approved live local trial, follow
[the example README](../examples/minimal-oauth-service/README.md) and
[connection guide](connect-to-hubspot.md). Keep separate state/admin/client
secrets, exact callback registration, minimum scopes and protected server storage.

This in-memory teaching service still refuses production mode. The exercise
adds no hosting adapter, durable store or user login. Record those as unfinished
rather than removing the guard.
