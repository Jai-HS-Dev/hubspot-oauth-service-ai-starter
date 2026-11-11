# Start With AI

You can start with the public GitHub link. You do not need a HubSpot login,
credentials, an MCP connection or a hosting account for the first exercise.

| What your assistant can do | How to start |
| --- | --- |
| Read GitHub links | Paste the prompt below with the public repository link. Ask it to name the files it could read. |
| Read project folders | Download the public repository ZIP, extract it, and open that folder in your coding tool. Then paste the prompt. |
| Only read chat or attachments | Share the public `README.md`, `START_WITH_AI.md` and `AGENTS.md`. Share the public walkthrough if asked. Never attach a private project, `.env` file or CRM export. |

If the assistant cannot run commands, it can still guide you. Run the local
steps yourself and share only the success line or a sanitized error.

```text
Help me use the HubSpot OAuth Service AI Starter. This is a guided starter, not a production integration.
Public repository: https://github.com/Jai-HS-Dev/hubspot-oauth-service-ai-starter

First read AGENTS.md, README.md and docs/start-here.md. If you can't read them,
say which file you need. Don't guess at repository commands or claim you ran them.

Start by asking me: "What feature needs access to a HubSpot account?"
If I don't have an idea yet, offer the supplied example. Explain terms as needed.
Use the local walkthrough with made-up data. Explain the command, where to run it,
and the line or screen that means it worked. If I can't run it yet, help me plan
from the example and mark the result as not run.

When I can recognize the sample result, propose one small change, the file to
edit, and how to check it. Read the relevant contract and example README before
editing. Keep the local sample working.

Follow AGENTS.md. No secrets or customer data in chat. Sharing this repo is not
approval to install packages, sign in, change permissions, publish, deploy, or
touch live data. Finish with what actually ran, what is still unverified, and
one next decision.
```

**Try saying:** "Show me what connecting and disconnecting an app would look like without connecting an account."

**First finish line:** Run `npm run smoke:example` using [the walkthrough](docs/start-here.md).
Show the pretend connection and explain how the mock check verifies disconnect. Do not present it as a real sign-in or a service that can be hosted.

**A later decision:** Before any account access, check whether the feature needs OAuth at all. For an approved local test-account connection, use `docs/first-live-test.md`.

**Build something:** [Build the connection check](docs/worked-example.md), then use the test-account guide only after approving the one-account OAuth trial.

Report actual results separately from instructions or plans. See
[what was tested](docs/EVIDENCE.md) for this starter's verification limits.

[AGENTS.md](AGENTS.md) holds the operating instructions; README.md explains scope.
Client-specific files should point there, not maintain competing rule sets.
No particular AI subscription, HubSpot CLI or MCP connection is required for the mock demo.
