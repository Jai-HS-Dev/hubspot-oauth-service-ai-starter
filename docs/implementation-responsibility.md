# Implementation Responsibility

This repository uses the MIT license so people can learn from it, copy it, modify it, and build from it. The starter is intentionally permissive, but it is not a production guarantee.

## What The MIT License Means Here

- You can use, copy, modify, merge, publish, distribute, sublicense, and sell copies of the starter code, subject to the MIT license text in `LICENSE`.
- The starter is provided without warranty.
- The license does not mean a generated app is automatically secure, compliant, approved by HubSpot, or ready for production.

## What Builders Must Still Check

Before using a generated tool with real users or real HubSpot data, the builder should verify:

- HubSpot developer platform requirements for their app type.
- Whether OAuth, static auth, a private app token, or another server-side auth pattern is appropriate.
- The minimum HubSpot scopes needed for the exact API endpoints used.
- Whether the app is for one account, many accounts, internal use, or marketplace distribution.
- Hosting limits, environment variable handling, logs, rollbacks, HTTPS, rate limits, and abuse controls.
- Token storage, refresh, revoke, uninstall, and secret rotation behavior.
- Data privacy, customer consent, retention, compliance, and internal company policies.
- Whether a professional developer, security reviewer, or legal/compliance reviewer should review the implementation.

## Good AI Assistant Behavior

When helping a user build from this repo, an AI coding tool should:

- Tell users this is a starter, not a production certification.
- Keep mock data as the first working version.
- Explain what must be checked in HubSpot's current developer docs.
- Ask the user to confirm their target use case before choosing auth and scopes.
- Avoid giving legal, compliance, or security guarantees.
- Point users to `REAL_TOOL_CHECKLIST.md`, `docs/non-developer-safety-gates.md`, and `docs/security-for-non-developers.md` before real data.

## Useful Official References

- GitHub licensing docs: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository
- HubSpot authentication overview: https://developers.hubspot.com/docs/apps/developer-platform/build-apps/authentication/overview
- HubSpot OAuth guide: https://developers.hubspot.com/docs/apps/developer-platform/build-apps/authentication/oauth/working-with-oauth