# Initialize PII for AI Agents

You are initializing the Project Intelligence Index (PII) for the current project. PII is a compact routing and memory layer for future AI agents, not a documentation mirror.

## Safety and evidence rules

- Treat original project files as the final source of truth.
- Do not invent facts. Label uncertain conclusions as `Uncertain` and cite the evidence that caused the inference.
- Inspect before writing. Do not modify product source files, project configuration, or user content.
- If `.project-intel/INDEX.md` already exists, stop initialization and use the update workflow instead. Never silently replace an existing index.
- Do not read secrets, credentials, dependency trees, generated outputs, large binaries, caches, or vendor directories unless essential to identify the project.
- Do not assume the project is software. It may be content, research, a course, a film or series, an automation, a game, documentation, or a mixed project.
- Keep every knowledge file concise. Link to source paths instead of copying source material.

## Read first

Read these package files before analysis:

1. `.pindex/core/principles.md`
2. `.pindex/core/schema.md`
3. The templates in `.pindex/templates/`

## Workflow

1. Locate the project root. Prefer the Git root when available; otherwise use the current working directory.
2. Perform bounded discovery:
   - Map top-level files and directories.
   - Identify existing agent instructions, manifests, entry points, readmes, plans, indexes, and high-signal source or content files.
   - Respect ignore files such as `.gitignore` and agent-specific ignore files.
   - Inspect Git status, recent commits, and useful history when Git exists. Git history is evidence, not a substitute for current files.
3. Classify one or more project types from evidence.
4. Infer the project purpose, goals, non-goals, users, current state, constraints, conventions, important components, workflows, and external dependencies.
5. Select dynamic Areas (important domains) and Entities (important named things). Create only categories that help a future agent route context. Avoid empty or speculative files.
6. Create `.project-intel/` with the required files from the templates plus `areas/`, `entities/`, `logs/`, and `archive/`.
7. Write `logs/STATE.md` with initialization time, current Git commit if available, working-tree status, and the evidence scope used. Never place secrets in this file.
8. Add the managed instruction block from `.pindex/core/schema.md` to the most portable existing instruction file. Prefer `AGENTS.md`; if none exists, create it. Preserve all existing content and do not add duplicate managed blocks. Agent-specific instruction files may reference `AGENTS.md` instead of duplicating the block.
9. Validate all links and `source_paths`, ensure `INDEX.md` is a short map, and confirm the generated intelligence is supported by inspected evidence.

## Required result

The finished project must contain:

- `.project-intel/INDEX.md`
- `.project-intel/PROJECT.md`
- `.project-intel/CURRENT.md`
- `.project-intel/HISTORY.md`
- `.project-intel/DECISIONS.md`
- `.project-intel/CONVENTIONS.md`
- `.project-intel/TODO.md`
- `.project-intel/ISSUES.md`
- `.project-intel/REFERENCES.md`
- `.project-intel/areas/`
- `.project-intel/entities/`
- `.project-intel/logs/STATE.md`
- `.project-intel/archive/`

Finish by reporting only: what changed, what was verified, and anything unresolved.
