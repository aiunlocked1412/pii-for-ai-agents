# Adapter Compatibility

PII keeps workflow behavior in `.pindex/core/` and uses thin project-local adapters.

| Adapter | Project-local format | Invocation | Status |
|---|---|---|---|
| Claude Code | `.claude/commands/*.md` | `/pindex-init`, `/pindex-update` | Native custom commands |
| Codex | `.agents/skills/<name>/SKILL.md` | `$pindex-init`, `$pindex-update`, or skill picker | Native repository skills |
| Gemini CLI | `.gemini/commands/*.toml` | `/pindex-init`, `/pindex-update` | Native custom commands |
| OpenCode | `.opencode/commands/*.md` | `/pindex-init`, `/pindex-update` | Native custom commands |
| Cursor | `.cursor/commands/*.md` | `/pindex-init`, `/pindex-update` | Native project commands |
| Hermes | `.hermes.md` | Natural-language request | Native project context routing |

## Compatibility policy

- Prefer current official, repository-local, version-controlled formats.
- Do not write into a user's home directory.
- Do not rely on deprecated mechanisms when a portable replacement exists.
- Document when an agent cannot expose an exact project-local slash command.
- Keep generic fallback usage available through the core Markdown files.

## Codex note

Codex custom prompts are deprecated and load from `~/.codex/prompts`, not from a project repository. PII therefore uses the current repository skill format under `.agents/skills`. This is portable and can be invoked explicitly, but its primary syntax is `$pindex-init` rather than an exact `/pindex-init` command.

Official references:

- [Codex skills](https://developers.openai.com/codex/skills)
- [Codex custom prompts](https://developers.openai.com/codex/custom-prompts)

## Claude Code note

Claude project commands are Markdown files under `.claude/commands/`. Each PII command is intentionally small and delegates to the shared core prompt.

Official reference: [Claude Code slash commands](https://docs.anthropic.com/en/docs/claude-code/slash-commands)

## Gemini CLI note

Gemini project commands are TOML files under `.gemini/commands/`. The prompt field routes to the shared core workflow.

Official reference: [Gemini CLI custom commands](https://geminicli.com/docs/cli/custom-commands)

## OpenCode note

OpenCode project commands are Markdown files under `.opencode/commands/`.

Official reference: [OpenCode commands](https://opencode.ai/docs/commands/)

## Cursor note

Cursor project commands are Markdown files under `.cursor/commands/`.

Official reference: [Cursor commands](https://cursor.com/docs/agent/chat/commands)

## Hermes note

Hermes discovers project context from `.hermes.md` and other instruction files, but in-session slash commands are registered by Hermes itself. The PII adapter uses project context to route explicit natural-language requests without changing the user's Hermes installation.

Official references:

- [Hermes documentation](https://hermes-agent.nousresearch.com/docs/)
- [Hermes project instructions](https://hermes-agent.nousresearch.com/docs/user-guide/project-context)

## Other agents

Any capable file-editing agent can use PII by reading and executing:

- `.pindex/core/init.md`
- `.pindex/core/update.md`

Agents should also honor the managed PII block in `AGENTS.md` after initialization.
