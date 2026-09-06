# PII Knowledge Schema

## Required structure

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

## Metadata for Area and Entity files

Use YAML frontmatter:

```yaml
---
type: area
name: Billing
keywords:
  - payment
  - subscription
related:
  - entities/subscriptions.md
source_paths:
  - src/billing/
updated: YYYY-MM-DD
confidence: confirmed
---
```

Allowed `type` values are `area` and `entity`. Use repository-relative paths. Use `confidence: uncertain` only when the body explains the uncertainty and evidence.

## Content constraints

- `INDEX.md` is the shortest file and acts only as a project map.
- `PROJECT.md` contains stable, long-lived context.
- `CURRENT.md` contains short-term state, not history.
- `HISTORY.md` records durable milestones and continuity, not raw Git logs.
- `DECISIONS.md` records decision, reason, status, consequences, and evidence.
- `CONVENTIONS.md` records project-specific rules actually evidenced in the project.
- `TODO.md` contains agent-useful work grouped as Now, Next, Later, and Backlog.
- `ISSUES.md` records known problems, limitations, debt, and workarounds.
- `REFERENCES.md` routes to authoritative internal and external references.
- Area and Entity files contain purpose/role, current state, relationships, important source paths, constraints, decisions, issues, and open questions only when relevant.
- Prefer links and bullets. Avoid long prose, copied source, generated API documentation, and empty headings.

## Managed instruction block

Merge this block exactly once into `AGENTS.md` or the selected portable project instruction file:

```markdown
<!-- pindex:start -->
## PII for AI Agents

This project uses Project Intelligence Index (PII).

Before meaningful work:
1. Read `.project-intel/INDEX.md`.
2. Read `.project-intel/CURRENT.md`.
3. Load only the Areas, Entities, decisions, issues, and references relevant to the task.
4. Read original project files only as needed; they remain the final source of truth.
5. If PII conflicts with the project, trust the project and update PII.

After meaningful knowledge changes, run the `pindex-update` workflow available in your AI agent.
<!-- pindex:end -->
```
