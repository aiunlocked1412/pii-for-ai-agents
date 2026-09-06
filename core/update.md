# Update PII for AI Agents

Update the existing Project Intelligence Index from meaningful project changes. This is an incremental maintenance operation, not regeneration.

## Safety and evidence rules

- Treat original project files as the final source of truth. Correct PII when the two disagree.
- Do not invent facts. Mark uncertainty explicitly.
- Require `.project-intel/INDEX.md`. If it is missing, stop and use the initialization workflow.
- Preserve unrelated knowledge files and all human edits unless current evidence proves them stale.
- Never rewrite every PII file merely for formatting consistency.
- Ignore insignificant changes unless they affect behavior, architecture, workflow, conventions, continuity, decisions, constraints, issues, or future context routing.
- Archive superseded knowledge when history remains useful; do not silently erase it.

## Read first

1. `.pindex/core/principles.md`
2. `.pindex/core/schema.md`
3. `.project-intel/INDEX.md`
4. `.project-intel/CURRENT.md`
5. `.project-intel/logs/STATE.md` when present

Then load only PII and source files relevant to detected changes.

## Workflow

1. Establish the previous PII baseline from `logs/STATE.md`, file metadata, and Git history when available.
2. Inspect Git status, changed files, diffs, recent commits after the baseline, and relevant non-Git evidence. If a reliable baseline cannot be established, state the limitation and use a conservative bounded comparison.
3. Build an impact map from changed source paths to related Areas, Entities, decisions, issues, history, and current work.
4. Update only affected files:
   - `CURRENT.md` for present focus, completed work, pending work, next steps, and blockers.
   - `HISTORY.md` for durable milestones and continuity.
   - Relevant Area and Entity files for changed behavior or relationships.
   - `DECISIONS.md`, `CONVENTIONS.md`, `ISSUES.md`, `TODO.md`, or `REFERENCES.md` only when evidence warrants it.
   - `PROJECT.md` only for long-lived project-level changes.
   - `INDEX.md` only when routing, focus, important categories, or recent milestones changed.
5. Add new Areas or Entities only when they improve future routing. Archive obsolete files under `.project-intel/archive/` and update inbound links.
6. Update `logs/STATE.md` with update time, inspected change range, current commit, working-tree status, affected PII files, and unresolved uncertainty. Do not store secrets or large diffs.
7. Ensure the managed instruction block still exists once in the selected project instruction file.
8. Validate changed links and source paths, and review the final diff to confirm unrelated PII was untouched.

## Knowledge threshold

Record a change only when a future agent may need it to understand the project, continue work, avoid a known mistake, preserve continuity, or locate the right source. Do not record cosmetic implementation details with no project-level consequence.

Finish by reporting only: what changed, what was verified, and anything unresolved.
