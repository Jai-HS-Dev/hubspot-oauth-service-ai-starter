# AI Customization Notes

When adapting this OAuth example:

1. Ask whether the user is learning locally, making a demo, or preparing for real users.
2. Do not ask the user to paste `HUBSPOT_CLIENT_SECRET`, access tokens, or refresh tokens into chat.
3. Keep the OAuth client secret server-side.
4. Replace the in-memory store before real users.
5. Ask which hosting provider the user prefers before adding provider-specific files.
6. Keep logs free of OAuth codes, access tokens, refresh tokens, and customer data.

Useful first prompt:

```text
Read this OAuth example and walk me through configuring it safely. Ask one question at a time and do not ask me to paste secrets into chat.
```
