import { constants } from "node:fs";
import { copyFile, lstat, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const sharedFiles = [
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
];
const adapterFiles = {
  claude: [
    ".claude/commands/pindex-init.md",
    ".claude/commands/pindex-update.md",
  ],
  codex: [
    ".agents/skills/pindex-init/SKILL.md",
    ".agents/skills/pindex-update/SKILL.md",
  ],
  gemini: [
    ".gemini/commands/pindex-init.toml",
    ".gemini/commands/pindex-update.toml",
  ],
  opencode: [
    ".opencode/commands/pindex-init.md",
    ".opencode/commands/pindex-update.md",
  ],
  cursor: [
    ".cursor/commands/pindex-init.md",
    ".cursor/commands/pindex-update.md",
  ],
  hermes: [".hermes.md"],
};

const adapterSource = {
  codex: (destination) => `adapters/codex/${destination.split("/").slice(-2).join("/")}`,
  hermes: () => "adapters/hermes/.hermes.md",
};

export const SUPPORTED_AGENTS = Object.freeze(Object.keys(adapterFiles));

export async function install({ target, agents, dryRun = false }) {
  const unknown = agents.filter((agent) => !SUPPORTED_AGENTS.includes(agent));
  if (unknown.length) {
    throw new Error(`Unsupported agent: ${unknown.join(", ")}`);
  }
  const created = [];
  const skipped = [];
  const planned = [];
  const files = [
    ...sharedFiles.map((relative) => ({ source: relative, destination: `.pindex/${relative}` })),
    ...agents.flatMap((agent) =>
      (adapterFiles[agent] ?? []).map((destination) => ({
        source: adapterSource[agent]?.(destination)
          ?? `adapters/${agent}/${path.basename(destination)}`,
        destination,
      })),
    ),
  ];

  await assertSafeTarget(target, files.map((file) => file.destination));

  for (const file of files) {
    const destination = path.join(target, file.destination);
    if (await exists(destination)) {
      skipped.push(file.destination);
      continue;
    }
    if (dryRun) {
      planned.push(file.destination);
      continue;
    }
    await mkdir(path.dirname(destination), { recursive: true });
    await assertNoLinkedPath(target, file.destination);
    try {
      await copyFile(
        path.join(packageRoot, file.source),
        destination,
        constants.COPYFILE_EXCL,
      );
      created.push(file.destination);
    } catch (error) {
      if (error.code === "EEXIST") {
        skipped.push(file.destination);
        continue;
      }
      throw error;
    }
  }

  return { created, skipped, planned };
}

async function assertSafeTarget(target, destinations) {
  let targetStats;
  try {
    targetStats = await lstat(target);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(`Target directory does not exist: ${target}`);
    }
    throw error;
  }
  if (!targetStats.isDirectory() || targetStats.isSymbolicLink()) {
    throw new Error(`Target must be a real directory, not a symbolic link or junction: ${target}`);
  }
  for (const destination of destinations) {
    await assertNoLinkedPath(target, destination);
  }
}

async function assertNoLinkedPath(target, relative) {
  const segments = relative.split("/");
  let current = target;
  for (const segment of segments) {
    current = path.join(current, segment);
    let stats;
    try {
      stats = await lstat(current);
    } catch (error) {
      if (error.code === "ENOENT") return;
      throw error;
    }
    if (stats.isSymbolicLink()) {
      throw new Error(`Refusing path through a symbolic link or junction: ${current}`);
    }
  }
}

async function exists(file) {
  try {
    await lstat(file);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}
