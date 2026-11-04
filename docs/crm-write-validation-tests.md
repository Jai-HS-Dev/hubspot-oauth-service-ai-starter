# CRM Write Validation Tests

Run synthetic tests before connecting customer data. A passing mock test does not
prove that a live account's rules or user permissions match your fixtures.

Reviewed on 2026-11-04 against HubSpot's October 27 correction. Required creation
properties are enforced on public API writes; required creation associations are
currently UI-only. Do not invent a HubSpot API rejection for a UI-required link.

## Required Cases

| Case | Synthetic response or setup | Expected behavior |
| --- | --- | --- |
| Conditional property | 400 VALIDATION_ERROR with MISSING_CONDITIONAL_REQUIRED_PROPERTY | Surface the missing property and rule; do not blindly retry. |
| Required create property | 400 VALIDATION_ERROR with MISSING_REQUIRED_PROPERTY | Preserve actionable error details; do not report a created record. |
| App-required record link | The app's business rules require a source or related record | Validate the link in your app, create it explicitly, and verify it; this is not API enforcement of UI-required associations. |
| API create without associations | Mocked 2xx with valid properties and no associations | Preserve success when accepted by the API; this client test does not prove a live portal's rules. |
| Association permission denied | A user-level connection without Edit Associations | Report failure or partial success with the created ID; do not claim the association exists. |
| Corrected input | Required properties supplied; requested associations included where appropriate | One successful request, followed by read-only verification where authorized. |
| Successful normalization | 2xx response with a warnings array | Preserve the ID and surface warnings without treating success as failure. |
| Partial multi-system write | One system succeeds and a later write fails | Preserve successful IDs, explain incomplete work, and prevent duplicate writes on retry. |

Use HubSpot's error shape for the target endpoint. Do not assume a single error
code for every association failure. Preserve status, category, structured errors,
and correlationId server-side; never log credentials or full CRM payloads.

## Test Levels

1. Mock the HTTP boundary and test your real client wrapper's error translation.
2. Test the action/UI contract so errors and warnings reach users.
3. With explicit approval, test synthetic records in a developer account using
   admin-configured required fields and a limited-permission test user.
4. Read back the records and associations and record non-secret results.

Do not change production validation rules or user permissions for a smoke test.
For user-level OAuth, test Edit Associations explicitly. This restriction is not
applied to portal-level app tokens and is not a reason to broaden an app's scopes
or switch authentication models automatically. Keep synthetic generic validation
fixtures clearly labeled; they test error handling, not a promised server rule.

## Source

[HubSpot 2026-09 write validation and warnings](https://developers.hubspot.com/changelog/crm-api-write-validation-enforcement)
