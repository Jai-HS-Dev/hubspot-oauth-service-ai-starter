# Local Upgrade Notes

## Unreleased - Easier README And Assistant Hard Rules

Prepared 2026-11-10. Documentation and learning aids only; no example behavior,
CI or security setting changed. No app was uploaded, migrated or deployed.

- README rewritten for three audiences: one status banner, a path table, a short
  quick start, numbered next steps and a single disclaimer section.
- AGENTS.md starts with a short Never / Ask first / Always block, and says when
  HubSpot's official developer tools may be used.
- README leads with the existing browser demo of the pretend connection.
- docs/first-live-test.md is a checklist for connecting one developer test account
  on your own computer. It has not been run end to end; see EVIDENCE.md.
- A dev container definition is included for browser-based editors. It has not
  been verified in GitHub Codespaces.
- Reference documents moved from the repository root into docs/: EVIDENCE, COMPATIBILITY, MIGRATION, UPGRADE_NOTES, ROADMAP, SUPPORT and REAL_TOOL_CHECKLIST.
  Links, AI instructions, checks and tests were updated to the new locations. If you
  keep your own links or scripts to the old locations, update them.

## v0.2.0 - Guided Starter Release

This release adds a single beginner walkthrough, example/evidence labels, aligned
AI entry points, safe recovery steps and regression checks. It remains a blueprint
with small local examples, not a finished production integration. Review the
behavior changes below before updating an existing implementation.

Reviewed 2026-11-04. Existing deployed OAuth services are not changed automatically.

- The example now defaults to an offline mock flow. It does not connect HubSpot
  unless USE_MOCK_DATA=false and the required local configuration is supplied.
- The listener is loopback-only; NODE_ENV=production is refused while storage is
  in memory. This is a teaching service, not a production multi-tenant broker.
- Callbacks require the initiating browser cookie, valid unexpired state, and a
  single use. Replaying an old install URL or pasting it into another browser fails.
- State no longer falls back to the HubSpot client secret. Live mode requires
  separate state and admin secrets of 32+ characters and an exact allowed account.
- Status, refresh and revoke require a server-side Bearer admin secret and exact
  account match. This is trusted-operator authorization, not an end-user login.
- Return targets and caller-supplied hostnames are ignored. Register the exact
  loopback callback in the example's .env. Never use this demo to replace a working
  deployed callback without a separately reviewed migration plan.
- server.js exports createServer/startServer. It uses an isolated in-memory store;
  the earlier memory-token-store.js remains a learning reference, not the active store.
- npm start loads ignored .env explicitly. Copy .env.example first; node server.js
  still runs the default mock. Smoke checks exercise the complete offline lifecycle.

See the example README for production prerequisites. MIT LICENSE is unchanged.
