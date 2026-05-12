# Implementation Responsibility

This repository uses the MIT license so people can learn from it, copy it, modify it, and build from it. The starter is intentionally permissive, but it is not a production guarantee.

This document is practical project guidance, not legal advice.

## What The MIT License Means Here

- You can use, copy, modify, merge, publish, distribute, sublicense, and sell copies of the starter code, subject to the MIT license text in `LICENSE`.
- If you copy or redistribute substantial portions of the starter, keep the copyright and license notice included as required by the MIT license.
- The starter is provided without warranty and without liability from the authors or copyright holders.
- The license does not mean a generated app is automatically secure, compliant, approved by HubSpot, eligible for the HubSpot Marketplace, or ready for production.
- The license covers this repository's code and docs. It does not grant rights to third-party services, trademarks, branding, APIs, data, or platform accounts.

## GitHub Repository Best Practices

For public starter repositories, keep these files visible and current:

- `LICENSE` in the repository root so GitHub can detect and display the license.
- `README.md` with plain-language scope, audience, and production-readiness notes.
- `SECURITY.md` with instructions for reporting security issues privately.
- `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, and issue/PR templates for community health.
- `docs/implementation-responsibility.md` for implementation responsibility, platform checks, and limits of the starter.

## What Builders Must Still Check

Before using a generated tool with real users or real HubSpot data, the builder should verify:

- HubSpot developer platform requirements for their app type.
- Whether OAuth, static auth, a private app token, or another server-side auth pattern is appropriate.
- The minimum HubSpot scopes needed for the exact API endpoints used.
- Whether the app is for one account, many accounts, internal use, or marketplace distribution.
- Hosting limits, environment variable handling, logs, rollbacks, HTTPS, rate limits, and abuse controls.
- Token storage, refresh, revoke, uninstall, and secret rotation behavior.
- Data privacy, customer consent, retention, compliance, and internal company policies.
- The terms and policies of HubSpot, hosting providers, AI coding tools, databases, email providers, and any other connected services.
- Whether a professional developer, security reviewer, or legal/compliance reviewer should review the implementation.

## Branding And Platform Approval

Using this starter does not grant permission to imply endorsement, certification, partnership, or marketplace approval by HubSpot, GitHub, any AI coding tool, or any hosting provider. Follow each platform's current branding, marketplace, developer, and acceptable-use rules.

## Good AI Assistant Behavior

When helping a user build from this repo, an AI coding tool should:

- Tell users this is a starter, not a production certification.
- Keep mock data as the first working version.
- Explain what must be checked in HubSpot's current developer docs.
- Ask the user to confirm their target use case before choosing auth and scopes.
- Avoid giving legal, compliance, or security guarantees.
- Mention that third-party platform terms and policies still apply.
- Point users to `REAL_TOOL_CHECKLIST.md`, `docs/non-developer-safety-gates.md`, and `docs/security-for-non-developers.md` before real data.

## Useful Official References

- GitHub licensing docs: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository
- Choose a License, MIT: https://choosealicense.com/licenses/mit/
- GitHub security policy docs: https://docs.github.com/en/code-security/how-tos/report-and-fix-vulnerabilities/configure-vulnerability-reporting/adding-a-security-policy-to-your-repository
- GitHub community profile docs: https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/about-community-profiles-for-public-repositories
- HubSpot authentication overview: https://developers.hubspot.com/docs/apps/developer-platform/build-apps/authentication/overview
- HubSpot OAuth guide: https://developers.hubspot.com/docs/apps/developer-platform/build-apps/authentication/oauth/working-with-oauth