# Recipe: Hosting Adapters

Keep OAuth logic portable by separating core handlers from hosting adapters.

## Adapter Targets

- generic Node HTTP server
- Vercel function
- Cloudflare Worker
- Netlify function
- Railway or Render Node service

## Pattern

Core logic should handle request data and return a response object. The adapter should translate platform-specific request and response APIs.

## Prompt

```text
Use the hosting adapters recipe. Keep OAuth core logic hosting-neutral and create the smallest adapter for my chosen host. Do not make Cloudflare, Vercel, or any one provider required.
```