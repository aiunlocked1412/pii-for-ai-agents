import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile, access, mkdir, symlink } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { install } from "../src/install.js";

test("installs the shared runtime and one selected adapter", async () => {
  const target = await mkdtemp(path.join(os.tmpdir(), "pindex-"));

  const result = await install({ target, agents: ["claude"] });

  assert.equal(result.created.length > 0, true);
  const core = await readFile(path.join(target, ".pindex", "core", "init.md"), "utf8");
  const command = await readFile(
    path.join(target, ".claude", "commands", "pindex-init.md"),
    "utf8",
  );
  assert.match(core, /Project Intelligence Index/);
  assert.match(command, /\.pindex\/core\/init\.md/);
});

test("preserves existing files", async () => {
  const target = await mkdtemp(path.join(os.tmpdir(), "pindex-"));
  const existing = path.join(target, ".claude", "commands", "pindex-init.md");
  await mkdir(path.dirname(existing), { recursive: true });
  await writeFile(existing, "keep me");

  const result = await install({ target, agents: ["claude"] });

  assert.equal(await readFile(existing, "utf8"), "keep me");
  assert.deepEqual(result.skipped, [".claude/commands/pindex-init.md"]);
});

test("installs init and update workflows for every supported agent", async () => {
  const target = await mkdtemp(path.join(os.tmpdir(), "pindex-"));
  const agents = ["claude", "codex", "gemini", "opencode", "cursor", "hermes"];

  await install({ target, agents });

  const expected = [
    ".pindex/core/init.md",
    ".pindex/core/update.md",
    ".pindex/core/principles.md",
    ".pindex/core/schema.md",
    ".pindex/templates/INDEX.md",
    ".pindex/templates/PROJECT.md",
    ".pindex/templates/CURRENT.md",
    ".pindex/templates/HISTORY.md",
    ".pindex/templates/DECISIONS.md",
    ".pindex/templates/CONVENTIONS.md",
    ".pindex/templates/TODO.md",
    ".pindex/templates/ISSUES.md",
    ".pindex/templates/REFERENCES.md",
    ".claude/commands/pindex-init.md",
    ".claude/commands/pindex-update.md",
    ".agents/skills/pindex-init/SKILL.md",
    ".agents/skills/pindex-update/SKILL.md",
    ".gemini/commands/pindex-init.toml",
    ".gemini/commands/pindex-update.toml",
    ".opencode/commands/pindex-init.md",
    ".opencode/commands/pindex-update.md",
    ".cursor/commands/pindex-init.md",
    ".cursor/commands/pindex-update.md",
    ".hermes.md",
  ];

  for (const relative of expected) {
    await assert.doesNotReject(access(path.join(target, relative)), relative);
  }
});

test("refuses adapter paths redirected through a directory link", async () => {
  const target = await mkdtemp(path.join(os.tmpdir(), "pindex-"));
  const outside = await mkdtemp(path.join(os.tmpdir(), "pindex-outside-"));
  await symlink(outside, path.join(target, ".claude"), "junction");

  await assert.rejects(
    install({ target, agents: ["claude"] }),
    /symbolic link or junction/,
  );
  await assert.rejects(access(path.join(outside, "commands", "pindex-init.md")));
});
