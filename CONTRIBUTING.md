# Contributing

Thanks for improving PII for AI Agents.

## Principles

- Keep core workflows agent-neutral.
- Put invocation syntax and file-format differences in adapters.
- Preserve Markdown as the project intelligence format.
- Do not add a server, database, cloud dependency, embeddings, or vector search to V1.
- Support non-software and mixed projects.
- Keep all distributable guides, prompts, templates, code comments, and user-facing CLI text in English.
- Never weaken evidence, source-of-truth, or non-destructive update rules.

## Development workflow

1. Create a focused branch.
2. Write a failing test for behavior changes.
3. Make the smallest implementation that passes.
4. Run the complete check suite.
5. Test installation in a temporary target.
6. Update documentation when compatibility or invocation changes.

```bash
npm test
npm run check
npm pack --dry-run
```

## Adding an adapter

1. Verify the agent's current official project-local command or skill format.
2. Add a thin wrapper under `adapters/<agent>/`.
3. Register its installed destination in `src/install.js`.
4. Add installation and language tests.
5. Document the exact invocation and any limitations in `docs/ADAPTERS.md`.

Do not copy the core workflows into an adapter. Each wrapper should route the agent to `.pindex/core/init.md` or `.pindex/core/update.md`.

## Prompt changes

Prompt changes must preserve:

- bounded discovery;
- evidence-only statements;
- original project files as the final source of truth;
- dynamic Areas and Entities;
- concise progressive disclosure;
- safe instruction-file merging;
- incremental updates that leave unrelated knowledge untouched.
