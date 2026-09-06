import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distributedTextFiles = [
  "README.md",
  "CONTRIBUTING.md",
  "SECURITY.md",
  "core/init.md",
  "core/update.md",
  "core/principles.md",
  "core/schema.md",
  "templates/INDEX.md",
  "templates/PROJECT.md",
  "templates/CURRENT.md",
  "templates/HISTORY.md",
  "templates/DECISIONS.md",
  "templates/CONVENTIONS.md",
  "templates/TODO.md",
  "templates/ISSUES.md",
  "templates/REFERENCES.md",
  "adapters/claude/pindex-init.md",
  "adapters/claude/pindex-update.md",
  "adapters/codex/pindex-init/SKILL.md",
  "adapters/codex/pindex-update/SKILL.md",
  "adapters/gemini/pindex-init.toml",
  "adapters/gemini/pindex-update.toml",
  "adapters/opencode/pindex-init.md",
  "adapters/opencode/pindex-update.md",
  "adapters/cursor/pindex-init.md",
  "adapters/cursor/pindex-update.md",
  "adapters/hermes/.hermes.md",
];

test("all distributed guides, templates, and prompts are English-only", async () => {
  for (const relative of distributedTextFiles) {
    const content = await readFile(path.join(root, relative), "utf8");
    assert.doesNotMatch(content, /[\u0E00-\u0E7F]/, relative);
  }
});
