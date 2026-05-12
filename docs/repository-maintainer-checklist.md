# Repository Maintainer Checklist

Use this checklist when reviewing changes to this public starter.

## Community Health

- README still has clear paths for non-developers, vibe coders, developers, and AI coding tools.
- `LICENSE`, `SECURITY.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, and `SUPPORT.md` are present.
- Issue templates and the pull request template warn users not to share secrets or customer data.

## AI Readiness

- `AGENTS.md`, `START_WITH_AI.md`, `.github/prompts/`, `.github/instructions/`, `.cursor/rules/`, and `.windsurfrules` still point users toward safe behavior.
- Recipes stay mock-first.
- Contracts in `docs/contracts/` are preserved when examples change.

## Security And Implementation Responsibility

- No real tokens, portal IDs, app IDs, private URLs, customer data, or private deployment details are committed.
- Auth, scopes, hosting, token storage, logs, revoke/uninstall, and implementation responsibility remain documented.
- `npm run check:ai` passes.
- `npm run smoke:example` passes when example behavior changes.

## GitHub Repository Settings To Consider

These settings are managed in GitHub, not in files:

- Enable Dependabot alerts and security updates.
- Enable secret scanning and push protection if available for the organization.
- Protect `main` with pull request review before merge.
- Require the AI starter check workflow before merge.
- Consider requiring CODEOWNERS review when the repo has multiple maintainers.