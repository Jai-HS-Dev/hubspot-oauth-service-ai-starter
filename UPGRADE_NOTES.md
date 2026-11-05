# Local Upgrade Notes

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
