# Evidence And Support

Reviewed 2026-11-04. Evidence is specific to each example, not certification of
apps generated from it. A successful HTTP response or AI answer is not a security
review or proof of installation.

| Surface | Current evidence |
| --- | --- |
| Local OAuth lifecycle | Mock start/callback/status/refresh/revoke tested |
| Real OAuth transport | Tested using synthetic injected responses only |
| Browser binding, replay and expiry | Locally tested |
| Durable storage, distributed refresh locks and user sessions | Not implemented |
| Production | Explicitly refused by this in-memory example |

## Before Real Users

1. Run the documented local tests with synthetic data. Do not skip failing tests.
2. Review authentication, account/user authorization, minimum scopes and logs.
3. For reusable apps, replace temporary environment tokens with an authenticated,
   tenant-keyed OAuth installation store; never return credentials to the UI.
4. Choose a host and verify HTTPS, private secrets, request limits, rate limiting,
   timeouts, storage, retention, health checks and recovery for that host.
5. Obtain approval for the exact developer app/account and synthetic live test.
6. Record the actual build, installed behavior and unresolved limitations before
   claiming account verification. Request separate approval for production.

No automated command here uploads or deploys the app. Existing CI configuration
was not changed in this update. Report security problems using SECURITY.md; do not
post credentials or customer data in public issues. Support is best-effort, as
stated in SUPPORT.md. MIT terms are in LICENSE, not a guarantee of legal immunity.

## Example Label Contract

[examples/catalog.json](examples/catalog.json) is the machine-readable index; each
example README repeats its label next to the code.

- **Runnable locally:** the named mock/offline check runs after documented setup.
  It does not imply installed or live-account verification.
- **Illustrative:** a pattern, fixture boundary or source scaffold; not a complete
  deployable integration. Component-level tests do not verify the whole project.
- **Developer-account verified:** requires recorded evidence for the exact app,
  account and operation. None is claimed for these examples.
- **Production prerequisites:** the builder's remaining checklist, not included
  production hosting, security certification or ongoing operation.

The beginner finish line is the local demo plus a small plan. See
[the walkthrough](docs/start-here.md) for success, recovery and what remains.
