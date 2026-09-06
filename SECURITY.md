# Security Policy

## Scope

PII for AI Agents installs local Markdown prompts, templates, and adapter files. It does not require network access, credentials, a server, a database, or an API key.

## Security expectations

The core workflows instruct agents to:

- avoid secrets and credential files during discovery;
- avoid dependency trees, generated outputs, caches, vendor directories, and large binaries unless essential;
- inspect before writing;
- preserve existing files by default;
- treat original project files as the final source of truth;
- avoid storing secrets or large diffs in `.project-intel/`;
- label uncertainty rather than inventing facts.

The installer never deletes or overwrites existing files. It rejects symbolic links and Windows junctions in the target or managed destination paths, and copies use exclusive creation to prevent a last-moment destination overwrite.

## Trust boundary

Run the installer only against a local project directory you control, and do not let another process mutate that directory during installation. A hostile local process running with the same account is outside the installer threat model because it already has equivalent filesystem permissions. The installer still rejects static link-based redirection and never offers a force-overwrite mode.

## Reporting a vulnerability

Open a private security report with the repository maintainer. Include reproduction steps, affected versions, impact, and a suggested mitigation when possible. Do not publish credentials or sensitive project content in an issue.
