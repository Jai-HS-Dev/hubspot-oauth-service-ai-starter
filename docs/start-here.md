# Your First Working Result

## What You Will Finish

Run the mock connection and disconnect check, then customize one display message without weakening authorization.

The command uses a loopback test server with made-up credentials, then closes it. No HubSpot account is connected.
No HubSpot account, credentials, hosting, or package installation is needed.
This is a local learning result, not a production integration.

## 1. Open The Project And Describe Your Goal

If your editor already has the repository open, keep using that folder. For a
published copy on GitHub, use **Code > Download ZIP**, extract it, then open the
extracted folder as a project. No Git installation is required. If you use a
release ZIP, give your AI the prompt link from the same release.
[GitHub download instructions](https://docs.github.com/en/repositories/working-with-files/using-files/downloading-source-code-archives).

The repository root contains README.md and package.json. It is not the ZIP, its
parent folder or an examples subfolder. Open a terminal there; in VS Code use
**Terminal > New Terminal**. Type commands in that terminal, not the AI chat.

Use [START_WITH_AI.md](../START_WITH_AI.md), then describe your goal in everyday
language. Your assistant should first ask: "What feature needs access to a HubSpot account?" No MCP connection or
account access is needed to help with the local example.

Check that Node.js (which runs the example) and npm (which runs named scripts)
are available:

```bash
node --version
npm --version
```

In Windows PowerShell use `npm.cmd --version` if npm.ps1 is blocked.
The local examples declare Node.js 22+.
This walkthrough was checked with Node.js 24.22.1; that is separate from managed
HubSpot or provider runtimes. If a command is missing, stop and ask for installation
guidance. Use a supported Node.js 24 release from the [official downloads](https://nodejs.org/en/download)
to reproduce this path, then reopen the terminal. Do not run random install scripts
or weaken execution policy.

## 2. Run The First Build-Along

From the repository root, check prerequisites and run the example:

```bash
npm run doctor
npm run build:example
```

In Windows PowerShell, use `npm.cmd` instead of `npm`.
Do not install project packages, create an app, or enter credentials for this step.

### Recognize Success

**Success looks like:** `worked connection status becomes disconnected only after mock revoke succeeds` passes.
Other output and timings may differ. Wait for the terminal prompt to return.
If you need to stop a running example, press **Ctrl+C** in that terminal only.
If the command fails, use [troubleshooting](troubleshooting.md) without disabling
security checks or granting more access.

Follow [the build-along](worked-example.md) to make one small change and check it again.
Before changing anything, answer: What actually needs account access, and how will the user tell whether the app is connected or disconnected?
You can stop after this local result. No account changes have been made.

## 3. Choose Authentication And Hosting Only If Needed

Mock-only learning can stop here. To install a card/tool or work with HubSpot data,
continue with [the HubSpot connection guide](connect-to-hubspot.md). It covers a
separate developer test account, feature/plan checks, authentication, hosting and
an approved synthetic trial. A HubSpot test is the next milestone, not production.

Read [which path fits](choose-your-path.md). You do not need all four starters.
Your feature is mock-only, already has working reviewed authorization, or uses an eligible single-account integration that does not need a reusable OAuth service.

For real work, identify the minimum data, access and existing host/auth first.
Preserve working choices unless a change is necessary. Use [auth choices](auth-options.md),
[hosting choices](hosting-options.md) and [compatibility](COMPATIBILITY.md).
Provider options are alternatives, not ready-made adapters for every host.

Before connecting, obtain explicit approval for the exact account,
operation and synthetic test data. Passing mock tests is
not permission to read customer data, create records, publish or deploy.

## 4. Build One Small Change

Make a [blueprint or plan](../docs/oauth-flow.md): one user goal, required inputs/outputs,
a safe failure and an acceptance check. Have the AI explain its changes before
a small, approved local edit. Keep mock mode available.
Use the selected example README rather than treating every recipe as implemented code.

Check [example labels](../examples/catalog.json) and [evidence](EVIDENCE.md).
Do not upload an illustrative folder or deploy an in-memory teaching service just
because it contains configuration files.

## 5. Verify And Record What Is Still Unfinished

Repeat the mock check after editing. Follow the selected example's setup before
the full local checks:

```bash
npm run check:ai
npm run check
npm test
```

Use npm.cmd in Windows PowerShell. These local checks need no third-party packages.
Report failures and skipped tests honestly; a skip is not passed coverage.

### Starter Walkthrough Complete

- You can explain your goal and recognize the expected local result.
- You know how to stop a manually started example.
- You can say which checks ran and which did not.
- You chose one next step, or deliberately stopped at mock-only learning.
- You understand that installed-account and production behavior remain unverified.

A real implementation still needs: Authenticated installation/management sessions, durable encrypted tenant storage, refresh locking, uninstall/recovery handling, hosting and approved live verification.
Review [the live-use checklist](REAL_TOOL_CHECKLIST.md) and
[implementation responsibility](implementation-responsibility.md) before real use.

Report **generated**, **locally tested**, **developer-account verified** and
**deployed** separately, with evidence and remaining unknowns. Keep customer data
out of reports; do not commit filled private plans or environment files.

