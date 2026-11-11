# First Test With HubSpot

> **Status:** written 2026-11-10 from this repository's example and HubSpot's
> official documentation. The maintainer has **not yet run these steps end to
> end**. Use them as a checklist to confirm, not as a guarantee, and record what
> really happened.

## What This Is

The pretend connection on your computer proves nothing about HubSpot. This is
the smallest real test: the example service, still running only on your
computer, connects to **one free developer test account** through HubSpot's real
permission screen, then disconnects. It reads and writes no CRM records.
It is optional. You can learn a lot and stop before this step.

## Before You Start

- [ ] You finished [the walkthrough](start-here.md) and the mock example passed.
- [ ] You have a developer test account that holds no real customer data. See
      [choosing where to test](connect-to-hubspot.md).
- [ ] The account owner approves three things: creating a learning app that uses
      OAuth, with the smallest read-only permission; using its client ID and
      secret on this computer; and connecting that one test account.

If any box is unchecked, stop here. Nothing is wrong; you are simply not ready.

## Steps

1. **Read the example's live-test section.**
   [Optional local live OAuth test](../examples/minimal-oauth-service/README.md#optional-local-live-oauth-test)
   lists the five steps and every value the service needs.
2. **Create the learning app with HubSpot's official tools.** Follow HubSpot's
   [OAuth guide](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/authentication/oauth/working-with-oauth),
   or the [Build with AI quickstart](https://developers.hubspot.com/docs/build-with-ai/quickstart)
   if you work with an AI assistant. Register the callback address exactly as
   the example uses it: `http://127.0.0.1:3000/oauth/callback`. The example also
   accepts `http://localhost:3000/oauth/callback`; whichever you choose, the
   address in HubSpot and in your local file must be identical.
3. **Put the values in a local file, never in chat.** In the example folder, copy
   `.env.example` to `.env` (Git ignores it). Set `USE_MOCK_DATA=false`, the
   client ID and secret, the test account's ID, and two different random values
   of at least 32 characters for `OAUTH_STATE_SECRET` and `OAUTH_ADMIN_SECRET`.
   Type them into the file yourself. Do not paste them into an AI chat, an issue
   or a screenshot.
4. **Start the service and connect.** Run `npm start` in the example folder. It
   listens only on your own computer. Open `http://127.0.0.1:3000/oauth/start`
   in your browser, check that HubSpot's screen names your test account and only
   the permission you chose, and approve.
5. **Check the result.** Success is `{"connected":true,"mock":false}` in the
   browser. No token or code should appear on the page or in the terminal.
6. **Disconnect.** Use the revoke route as the example README describes, then
   stop the service with Ctrl+C and **write down what happened** using the
   template below. If you are finished, delete the `.env` file and remove the
   learning app or its secret in HubSpot.

## Record The Result

Keep the full note private. Add only a short, cleaned-up summary to
[EVIDENCE.md](../EVIDENCE.md).

```text
Date:
Tested by (role, not a name):
Account type: developer test account
Permissions requested:
Callback address used:
Tool versions (Node.js):
What the browser showed after approval:
Did refresh and revoke work:
What I had to change to make it work:
Not tested:
```

Leave out account IDs, people's names, client secrets, tokens and screenshots
of real records.

## If Something Fails

Stop and read [troubleshooting](troubleshooting.md). Do not remove the state
check, ask for wider permissions, expose the service to the internet, or move to
your everyday business account to get past an error. Put the service back on
the pretend connection with `USE_MOCK_DATA=true`.

## What This Does Not Prove

Connecting one test account on your own computer is a learning milestone. The
example keeps tokens in memory and loses them on restart, so it is not a service
you can host. It is not a security review and not approval for real customers.
Before real use, go through the [live-use checklist](../REAL_TOOL_CHECKLIST.md)
and [implementation responsibility](implementation-responsibility.md).
