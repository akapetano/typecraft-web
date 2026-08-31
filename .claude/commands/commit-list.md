---
description: Draft a list of semantic commit messages for the current git changes
argument-hint: [output path — defaults to draft/commit-list.md]
---

Produce a list of conventional commit messages for the current git changes, then
write it to the output path given in `$ARGUMENTS`, or `draft/commit-list.md` when
none is provided. **Do not commit or stage anything** — this command only drafts
the list.

Steps:

1. Inspect the working tree: `git status --short` plus `git diff` and
   `git diff --staged` (and note untracked files). Group the changes into
   logical, self-contained commits — one concern per commit.
2. Follow the repo's commit convention (`.cursor/rules/git-commits.mdc`); confirm
   the style against recent history with `git log --oneline -20`:
   - Conventional format `type(scope): description`.
   - Types: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `test`, `ci`,
     `perf`. Scope optional but helpful (e.g. `theme`, `deps`, `typing`).
   - Description: lowercase, imperative mood.
3. Write the result to the output path from `$ARGUMENTS` (default
   `draft/commit-list.md`), overwriting any existing content. Create parent
   directories if they don't exist.

Output format — for each proposed commit list the message, a ready-to-run
`git add` for exactly that commit's files, then the files it covers:

````md
## <type(scope): description>

```bash
git add path/to/file-a path/to/file-b
```

- path/to/file-a
- path/to/file-b
````

The `git add` line is there to be copied and run by hand — printing it is not
staging, so this command still stages nothing itself.

When a file's changes belong to more than one commit, do **not** emit a plain
`git add` for it — that would over-stage. Emit `git add -p <file>` instead, and
say in the file list which hunks belong to this commit (identify them by their
`@@` offsets from `git diff -U0 <file>`, or by the scripts/deps/section they sit
in). Flag the split in the closing note too.

Order commits so any dependency/build changes come before the code that relies
on them. Each commit should leave the tree in a working state — if two changes
can't be separated without breaking the build in between (e.g. removing a
dependency while a config file still imports it), keep them in one commit and
say why. End with a short note if some changes don't fit cleanly into one commit.
