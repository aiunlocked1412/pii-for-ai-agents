# PII for AI Agents

**Project Intelligence Index for AI Agents** is a portable, Markdown-first project memory layer. It gives a new AI agent a compact map of a project before the agent reads source files, content archives, research materials, or production assets.

PII works with software, content, research, courses, games, films, series, automation, documentation, and mixed projects.

> PII is compressed understanding, not the source of truth. Original project files always win.

## Why PII

Without PII, every new agent tends to scan the repository and reconstruct the same context. With PII, the workflow becomes:

```text
.project-intel/INDEX.md
        ↓
PROJECT.md + CURRENT.md
        ↓
Relevant Areas + Entities
        ↓
Relevant original project files
```

## MVP features

- Agent-generated `.project-intel/` knowledge
- `pindex-init` initialization workflow
- Incremental `pindex-update` workflow
- Dynamic Areas and Entities based on the actual project
- Safe, idempotent installation that preserves existing files
- Adapters for Claude Code, Codex, Gemini CLI, OpenCode, Cursor, and Hermes
- No server, database, cloud account, embeddings, vector search, or API key
- English-only distributable guides, prompts, and templates

## Install into a project

From this repository:

```bash
npm install
node bin/pindex.js install --target /path/to/project --agents all
```

After publication to npm:

```bash
npx pii-for-ai-agents@latest install --agents all
```

Install selected adapters:

```bash
pindex install --agents claude,codex,gemini
```

Preview without writing:

```bash
pindex install --agents all --dry-run
```

Existing files are always preserved. Review and reconcile conflicts manually, then run the installer again if needed.

## Invoke the workflows

| Agent | Initialize | Update | Installed integration |
|---|---|---|---|
| Claude Code | `/pindex-init` | `/pindex-update` | `.claude/commands/*.md` |
| Gemini CLI | `/pindex-init` | `/pindex-update` | `.gemini/commands/*.toml` |
| OpenCode | `/pindex-init` | `/pindex-update` | `.opencode/commands/*.md` |
| Cursor | `/pindex-init` | `/pindex-update` | `.cursor/commands/*.md` |
| Codex | `$pindex-init` | `$pindex-update` | `.agents/skills/*/SKILL.md` |
| Hermes | Ask: `Initialize PII` | Ask: `Update PII` | `.hermes.md` project context |
| Other agents | Ask the agent to execute `.pindex/core/init.md` | Ask the agent to execute `.pindex/core/update.md` | Agent-neutral core prompts |

### Why Codex uses skills

Current Codex project-local distribution uses repository skills in `.agents/skills/`. Codex custom prompts are deprecated and only load from the user's local Codex home, so they are not suitable for a portable project package. Select the skill with `$pindex-init`, `$pindex-update`, or the Codex skill picker.

### Why Hermes uses natural-language invocation

Hermes project context files are portable, but its slash commands come from the application command registry rather than project-local Markdown command files. The adapter therefore provides automatic routing from natural-language requests without modifying a user's Hermes installation.

## Generated project intelligence

After initialization:

```text
.project-intel/
├── INDEX.md
├── PROJECT.md
├── CURRENT.md
├── HISTORY.md
├── DECISIONS.md
├── CONVENTIONS.md
├── TODO.md
├── ISSUES.md
├── REFERENCES.md
├── areas/
├── entities/
├── logs/
└── archive/
```

`INDEX.md` stays short. It routes the agent to current state, relevant Areas, relevant Entities, and then the original project files.

## Adapter architecture

The package separates behavior from invocation:

```text
core/          Agent-neutral workflows and schema
adapters/      Agent-specific command or skill wrappers
templates/     Initial knowledge shapes
src/           Dependency-free installer
```

Adapters contain only thin wrappers. The core prompts remain the single source of workflow behavior.

See [Adapter Compatibility](docs/ADAPTERS.md) and [Architecture](docs/ARCHITECTURE.md).

## Development

Requires Node.js 18 or newer.

```bash
npm test
npm run check
npm pack --dry-run
```

Tests use Node's built-in test runner and require no runtime dependencies.

## Status

This repository contains the V1 MVP implementation. The package has not been published to npm from this working copy.

## License

MIT
