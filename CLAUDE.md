# CLAUDE.md

Guidance for Claude Code in this repo. Conventions are maintained once and
imported here — don't duplicate them.

## Project conventions (single source of truth)

@AGENTS.md

`AGENTS.md` links to the detailed rules in `.cursor/rules/` (project-overview,
react-next-components, panda-styling, theme, app-router, testing, typescript,
accessibility, react-compiler-client, git-commits). Follow those.

## Claude-Code-specific essentials

- **Package manager**: pnpm (`pnpm@10.28.0`, Node `>=22`). Do not use npm/yarn.
- **Key scripts**:
  - `pnpm dev` – dev server (host `local.typecraft`)
  - `pnpm lint` / `pnpm fix` – Biome check / check --write
  - `pnpm test` / `pnpm test:run` / `pnpm test:integration` – Vitest
  - `pnpm build` – production build
- **Panda codegen**: run `panda codegen` (or `pnpm prepare`) after any theme or
  token change so `styled-system/` stays in sync.
- **Commits**: conventional commits enforced via commitlint + Husky; `lint-staged`
  runs Biome on commit. See `.cursor/rules/git-commits.mdc`.

## Slash commands

Project commands live in `.claude/commands/`:

- `/verify` – pre-PR gate: `pnpm lint`, `pnpm test:run`, `pnpm build`.
- `/scaffold-feature` – scaffold a feature's file structure per AGENTS.md.
- `/add-recipe` – scaffold a Panda recipe / `cva` variant and run codegen.
- `/a11y` – run an accessibility audit via the `beacon:a11y-audit` skill.

## Shared vs. personal config

- Committed (team-shared): `CLAUDE.md`, `.claude/settings.json`, `.claude/commands/`.
- Personal (gitignored): `.claude/settings.local.json` — your own permissions/MCP.
