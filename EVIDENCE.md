# Evidence And Support

## README Update Verification

Checked 2026-11-10 on Linux with Node.js 22.23.4 and 24.22.2, in an automated run by an AI
coding assistant. This is not an independent beginner test.

- `npm run check:ai`, `npm run check`, `npm run doctor`, `npm run smoke:example` and `npm test` passed; the browser demo returned the documented pretend-connection result.
- Every relative link in the Markdown files was checked to resolve to a file.
- Not established: how the README renders on GitHub, the dev container in
  GitHub Codespaces and every step of docs/first-live-test.md. No HubSpot account was
  connected and nothing was uploaded.

## Starter Follow-Through Verification

Checked 2026-11-05 on Windows with Node.js 24.22.1:

- Full local suite: 21 passed, none skipped in the final run.
- Readiness, source syntax and documented first-demo checks passed.
- Fresh source snapshots excluded Git metadata, filled environment files and node_modules.
- The worked exercise's changed expectation failed, then its documented matching
  change passed in an isolated copy. This was a self-run command walkthrough.
- Independent beginner/AI-client testing, Node.js 22 and Linux execution, GitHub CI runs, cloud builds and installed
  HubSpot behavior are not established by these checks.

The CI matrix is intended coverage, not a recorded remote result. GitHub settings
and publishing remain separate approvals. No live accounts were connected,
customer records accessed, apps uploaded or services deployed during this update.

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

No automated command here uploads or deploys the app. The test-only CI source
now includes the full suite and a Windows/Linux, Node.js 22/24 matrix; a workflow
file alone does not prove a successful GitHub run. Report security problems using SECURITY.md; do not
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
