# AI Coding Tools

This repository is designed to work with many AI coding tools, not one vendor.

## Recommended Flow

1. Open this repository in your AI coding tool.
2. Ask it to read `START_WITH_AI.md` first.
3. Keep secrets out of chat.
4. Start with mock data.
5. Ask for a small plan before code changes.
6. Run the suggested checks after each change.

## Supported Instruction Files

- `AGENTS.md`: primary cross-tool instructions.
- `CLAUDE.md`: Claude Code entry point.
- `GEMINI.md`: Gemini CLI entry point.
- `.github/copilot-instructions.md`: GitHub Copilot repository guidance.
- `.github/instructions/*.instructions.md`: path-specific Copilot guidance.
- `.github/prompts/*.prompt.md`: reusable task prompts.

## Tool-Specific Tips

- Codex: ask it to inspect the repo first, then make scoped edits and run checks.
- Cursor: attach the repo and ask it to follow `AGENTS.md` before generating code.
- Claude Code: ask it to read `CLAUDE.md`, then `AGENTS.md`.
- GitHub Copilot: use the prompt files in `.github/prompts/` and keep repository instructions enabled.
- Gemini CLI: ask it to read `GEMINI.md`, then `AGENTS.md`.
- Windsurf and other tools: paste the `START_WITH_AI.md` prompt and point them to `AGENTS.md`.

## What The AI Should Not Do

- It should not ask for raw tokens or secrets in chat.
- It should not hard-code real portal IDs, app IDs, account IDs, deployment URLs, or customer data.
- It should not connect to real HubSpot data before explaining scopes and secret storage.
- It should not assume Cloudflare, Vercel, Codex, Cursor, or any one tool is required.
