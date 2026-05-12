# Security Review Before Deploy

Use this prompt before connecting real HubSpot data or deploying:

```text
Review this repository for deployment readiness. Focus on secrets, tokens, HubSpot scopes, request validation, browser exposure, logs, error messages, and mock data accidentally left in production paths.

Do not modify files yet. Give me findings first, ordered by severity, with file references and specific fixes.
```
