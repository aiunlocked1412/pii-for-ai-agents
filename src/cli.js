import path from "node:path";

import { install, SUPPORTED_AGENTS } from "./install.js";

const HELP = `PII for AI Agents

Usage:
  pindex install [options]
  pindex --help
  pindex --version

Options:
  --target <path>       Project directory (default: current directory)
  --agents <list>       Comma-separated adapters or "all" (default: all)
  --dry-run             Report planned changes without writing files
  -h, --help            Show this help
  -v, --version         Show the package version

Supported adapters:
  claude, codex, gemini, opencode, cursor, hermes
`;

export async function run(argv, io = console) {
  if (argv.includes("--help") || argv.includes("-h") || argv.length === 0) {
    io.log(HELP);
    return 0;
  }
  if (argv.includes("--version") || argv.includes("-v")) {
    io.log("0.1.0");
    return 0;
  }
  if (argv[0] !== "install") {
    io.error(`Unknown command: ${argv[0]}\nRun pindex --help for usage.`);
    return 1;
  }

  try {
    const options = parseInstallArgs(argv.slice(1));
    const result = await install(options);
    if (options.dryRun) {
      io.log(`Dry run: ${result.planned.length} file(s) would be installed; ${result.skipped.length} skipped.`);
    } else {
      io.log(`Installed PII for AI Agents: ${result.created.length} file(s) created; ${result.skipped.length} skipped.`);
    }
    if (result.skipped.length) {
      io.log("Existing files were preserved. Review them before making manual changes.");
    }
    return 0;
  } catch (error) {
    io.error(error.message);
    return 1;
  }
}

function parseInstallArgs(args) {
  let target = process.cwd();
  let agents = [...SUPPORTED_AGENTS];
  let dryRun = false;

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--target") {
      target = requireValue(args, ++index, "--target");
    } else if (arg === "--agents") {
      const value = requireValue(args, ++index, "--agents");
      agents = value === "all"
        ? [...SUPPORTED_AGENTS]
        : [...new Set(value.split(",").map((item) => item.trim()).filter(Boolean))];
      if (!agents.length) throw new Error("--agents requires at least one adapter");
    } else if (arg === "--dry-run") {
      dryRun = true;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  return { target: path.resolve(target), agents, dryRun };
}

function requireValue(args, index, option) {
  const value = args[index];
  if (!value || value.startsWith("--")) {
    throw new Error(`${option} requires a value`);
  }
  return value;
}
