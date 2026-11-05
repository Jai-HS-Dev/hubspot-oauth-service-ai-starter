# From Mock Demo To A HubSpot Test

This starter helps you build toward a real tool. The mock is a first checkpoint,
not the whole journey. You need access to a suitable HubSpot account to install
an app/card or read and write HubSpot data.

You can stop at learning, test an implementation, or plan later production use.
These are different milestones, not a promise that this repository supplies every
missing component.

## 1. Choose Where To Test

Ask your assistant to help you choose an account, not to assume your everyday
business account is the test target.

| Your situation | Next step |
| --- | --- |
| No HubSpot login yet | Start with [HubSpot's onboarding](https://developers.hubspot.com/developer-platform-basics), then create a separate developer test account. |
| Existing HubSpot login | In Development, open Testing > Test Accounts and choose Create developer test account. |
| Organization already has a suitable sandbox | Ask its admin whether you may use it and what data it contains. Do not assume it is empty. |
| Ready for business use | Confirm the target account's subscriptions, permissions and approval separately from the test. |

A developer test account is free; trial features and limits apply. It is not the
same as a production account or an Enterprise sandbox. Modern HubSpot accounts
have a Development area; you do not need to find the legacy developer-account UI.
See [account types](https://developers.hubspot.com/docs/getting-started/account-types).

Use the [configurable test-account guide](https://developers.hubspot.com/docs/developer-tooling/local-development/configurable-test-accounts)
to choose test subscription tiers. A test with extra trial features does not prove
the customer's actual plan supports your tool.

If a menu or permission is missing, stop and ask an admin. Do not buy a plan,
request broad access, or switch accounts just to clear a setup error.

## 2. Check What The Feature Needs

Describe the goal without customer details. Ask the assistant to list:

- The HubSpot feature: a card, agent tool, workflow action, or data-only service.
- The account features and permissions required.
- The minimum objects, fields and read/write access.
- Existing approved apps, authentication and hosting that can be reused.
- Missing implementation work in the selected example.

The assistant should check current official documentation for this exact feature
before proposing setup commands. Downloading a repo or connecting an AI tool does
not install the app. CLI login helps development; it does not replace app
authentication or permission to access CRM data.

## 3. Choose Authentication, Not Just A Token

Authentication means how your software proves it is allowed to connect.

| Goal | Option to evaluate |
| --- | --- |
| Local made-up data only | Keep mock mode; no account credentials. |
| Data-only REST integration for one account | A scoped Service Key, where supported. It does not install platform features. |
| Project-based app for one account | Static app authentication, if the selected feature supports it. |
| App installed in multiple customer accounts | OAuth. |
| Existing reviewed connection | Reuse it only if its permissions and account boundaries fit. |

[HubSpot's authentication overview](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/authentication/overview)
and [Service Key limits](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/authentication/account-service-keys)
explain the choices. Service Keys are not app-card, webhook or agent-tool setup.

With OAuth, plan the app registration, exact callback URL, minimum scopes,
browser-bound state, server-side token exchange, protected storage, refresh and
disconnect handling. Never paste the client secret or tokens into chat.

A valid API credential does not authorize everyone who calls your backend.
Verify the caller and permitted account/user/record separately. See
[auth options](auth-options.md) and the selected example's limits before adapting it.

## 4. Choose Hosting Only When Needed

The mock runs on your computer. A real feature may need supported HubSpot project
functions or an external backend, such as Cloudflare, Vercel or another host.
Use [hosting options](hosting-options.md); check feature availability, runtime,
HTTPS, secrets, storage, costs and rollback before choosing.

Do not assume the local Node server runs unchanged on every serverless host.
Existing OAuth, hosting or a companion starter may help, but none is mandatory
for every design. The OAuth teaching example is not a production token service.

## 5. Approve One Small Trial

Before account creation, package installation, connection, upload or deployment,
agree on the exact target and operation. Reading test-account data is still a
live API request; made-up record names do not make it an offline mock.

Use synthetic records and the smallest read-only check where the feature allows.
Have the user confirm the selected account in HubSpot, review requested
permissions and enter credentials only into ignored local files or an approved
server-side secret store. Do not send customer data to an AI without approval.

For a write, agree on the exact test action, duplicate prevention and recovery
first. Check for workflows or external integrations that the write might trigger.
Keep mock mode available; do not merely disable it and assume the example is ready.

Success means the agreed feature actually works in that test account, with
expected associations, permission failures and safe errors checked as applicable.
Record local tests and installed-account evidence separately in a private,
sanitized test note; never commit credentials or customer details.

## 6. Decide What Comes Next

Review [the real-use checklist](../REAL_TOOL_CHECKLIST.md) and
[implementation responsibility](implementation-responsibility.md).
Production needs a separate decision, security/permission review and operation
plan. A developer-account test does not verify production readiness.

For the AI-assisted conversation, use this next request:

```text
The mock works. Help me plan a HubSpot test using docs/connect-to-hubspot.md.
Ask one question at a time. Explain my account, authentication and hosting options.
Check current official requirements and identify missing implementation work.
Do not connect, install, change data or deploy until I approve the target and action.
Never ask for secrets or customer data in chat.
```
