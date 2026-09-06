# Architecture

## Goal

PII provides a portable project intelligence layer that lets future AI agents understand and continue a project without rereading everything.

## Layers

### Core workflows

`core/init.md` and `core/update.md` define agent-neutral behavior. `core/principles.md` defines invariants. `core/schema.md` defines knowledge structure and the managed project-instruction block.

### Templates

`templates/` defines concise starting shapes for required `.project-intel/` files. The initializing agent adapts them to project evidence rather than filling every placeholder mechanically.

### Adapters

`adapters/` translates each agent's invocation convention into a thin reference to the core workflow. Business logic must not be duplicated in adapters.

### Installer

The dependency-free Node.js installer copies shared files and selected adapters into an existing project. It never overwrites existing destinations and supports a no-write `--dry-run`.

## Installed package files

Shared files are copied to `.pindex/`. This directory is the portable workflow runtime and should be committed with the project. The project intelligence produced by an agent lives separately in `.project-intel/`.

## Knowledge lifecycle

```text
Discover → Summarize → Index → Use → Detect change → Update → Archive
```

Initialization is bounded but broad enough to classify the project. Updates begin from change evidence and touch only affected knowledge.

## Trust model

- Original project files are authoritative.
- PII contains compressed, fallible understanding.
- Source paths make knowledge traceable.
- Uncertain conclusions are labeled.
- Existing project instructions are preserved and receive one idempotent managed block.

## V1 boundaries

V1 intentionally excludes dashboards, background services, databases, embeddings, vector search, MCP servers, cloud sync, and complex search infrastructure.
