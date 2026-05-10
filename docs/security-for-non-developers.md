# Security For Non-Developers

OAuth secrets and tokens are software passwords.

Do not paste these into AI chat:

- OAuth client secret
- access token
- refresh token
- private app token
- database URL
- hosting provider token
- customer data

Use placeholders when talking to an AI assistant:

```text
HUBSPOT_CLIENT_SECRET=<stored in hosting secret manager>
```

If you accidentally publish a secret, rotate or revoke it immediately. Deleting it from the file is not enough if it was committed to git history or posted publicly.

