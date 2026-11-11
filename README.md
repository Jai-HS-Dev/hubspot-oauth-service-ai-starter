# HubSpot OAuth Service AI Starter

Learn how an app asks for permission to use a HubSpot account, keeps the connection working, and disconnects. This permission process is called OAuth.

> [!NOTE]
> **A guided starter, not a production integration.** You can practice without
> a HubSpot account or credentials. To test inside HubSpot, use a developer
> test account with made-up records.

**Sample result:** The mock exercise checks connection status before and after disconnect. No HubSpot account is connected and no credentials are printed.

## Pick Your Path

- **New to coding:** [Follow the walkthrough](docs/start-here.md), including what to install and where to type commands.
- **Building with AI:** Paste the message below into your assistant. The [full AI walkthrough](START_WITH_AI.md) explains what to do if it can't open the repo or run commands.
- **Developer:** [Code map](docs/developer-architecture.md) | [Installation contract](docs/contracts/oauth-installation-contract.md) | [Example files](examples/minimal-oauth-service/README.md).

## Start With AI

Copy this into your AI chat. Add your goal in plain English if you already have one.

```text
Help me use this HubSpot learning starter: https://github.com/Jai-HS-Dev/hubspot-oauth-service-ai-starter
Read START_WITH_AI.md and AGENTS.md from the same version as my copy.
If you can't open them, ask for those public files. Ask what I want to build,
then guide me through the first local example with made-up data.
Don't ask for secrets, connect an account, or deploy anything. This is a prototype, not a production integration.
```

## Try It Locally

Install [Node.js 22 or newer](https://nodejs.org/en/download) if you don't have it.
On GitHub, choose **Code > Download ZIP**, extract it, and open a terminal in
the folder with this README. For a versioned copy, use a learning-starter ZIP
from [Releases](https://github.com/Jai-HS-Dev/hubspot-oauth-service-ai-starter/releases) and share its matching AI prompt.
No project packages need to be installed for this step.

```bash
npm run doctor
npm run build:example
```

In Windows PowerShell, use `npm.cmd` instead of `npm`.

**Success looks like:** `worked connection status becomes disconnected only after mock revoke succeeds` passes.

To see the pretend connection in a browser, follow the [interactive demo](examples/minimal-oauth-service/README.md#first-working-run).

## Make It Yours

1. **Build a connection status check:** Run `npm run build:example`, then [follow the exercise](docs/worked-example.md) to check connect and disconnect without printing credentials.
2. **Verify in HubSpot when ready:** [Connect and disconnect one developer test account](docs/first-live-test.md). Keep the example on your own computer; it stores tokens only in memory and is not a hosted service.
3. **Before real use:** Review the [live-use checklist](docs/REAL_TOOL_CHECKLIST.md). Approve the account, permissions, and action first. Never paste secrets into chat or commit them.

You don't need OAuth for every one-account project. [Compare sign-in choices](docs/choose-your-path.md) before adding it. Use [HubSpot's OAuth guide](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/authentication/oauth/working-with-oauth) and [sample app](https://github.com/HubSpot/oauth-quickstart-nodejs) when setting up a real app.

No specific AI editor or hosting provider is required. For account and authentication choices, see the [connection guide](docs/connect-to-hubspot.md). [AGENTS.md](AGENTS.md) gives assistants instructions; it does not control their permissions.

## Tests And Help

For production requirements, platform questions, or a complex build, see
[where to get help](docs/SUPPORT.md#hubspot-questions-and-production-help).

`npm test` checks the local lifecycle and failure cases without credentials or package installs. See [what was tested](docs/EVIDENCE.md), [troubleshooting](docs/troubleshooting.md), and the [plain-language glossary](docs/glossary.md). [Support](docs/SUPPORT.md) is best-effort. Use the [security policy](SECURITY.md) to report security issues without exposing private data.

## License And Responsibility

[MIT License](LICENSE). This project is independent: it is not affiliated
with, endorsed by, or supported by HubSpot.
The examples are not security-audited and are provided as is, without warranty. You are responsible for
[validating, securing, and operating what you build](docs/implementation-responsibility.md).
