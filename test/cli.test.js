import assert from "node:assert/strict";
import { access, mkdtemp, readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const bin = path.join(root, "bin", "pindex.js");

function run(args) {
  return spawnSync(process.execPath, [bin, ...args], {
    cwd: root,
    encoding: "utf8",
  });
}

test("CLI installs all adapters into an explicit target", async () => {
  const target = await mkdtemp(path.join(os.tmpdir(), "pindex-cli-"));

  const result = run(["install", "--target", target, "--agents", "all"]);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Installed PII for AI Agents/);
  await assert.doesNotReject(access(path.join(target, ".claude", "commands", "pindex-init.md")));
  await assert.doesNotReject(access(path.join(target, ".agents", "skills", "pindex-init", "SKILL.md")));
});

test("CLI rejects unknown agents without writing package files", async () => {
  const target = await mkdtemp(path.join(os.tmpdir(), "pindex-cli-"));

  const result = run(["install", "--target", target, "--agents", "unknown"]);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /Unsupported agent: unknown/);
  await assert.rejects(access(path.join(target, ".pindex")));
});

test("CLI dry run reports files without changing the target", async () => {
  const target = await mkdtemp(path.join(os.tmpdir(), "pindex-cli-"));

  const result = run(["install", "--target", target, "--agents", "claude", "--dry-run"]);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Dry run/);
  await assert.rejects(access(path.join(target, ".pindex")));
});

test("CLI rejects force overwrite mode", async () => {
  const target = await mkdtemp(path.join(os.tmpdir(), "pindex-cli-"));

  const result = run(["install", "--target", target, "--force"]);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /Unknown option: --force/);
  await assert.rejects(access(path.join(target, ".pindex")));
});

test("CLI prints English help", () => {
  const result = run(["--help"]);

  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage:/);
  assert.doesNotMatch(result.stdout, /[\u0E00-\u0E7F]/);
});
