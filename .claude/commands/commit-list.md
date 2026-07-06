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

Output format — for each proposed commit list the message and the files it
covers:

```md
## <type(scope): description>

- path/to/file-a
- path/to/file-b
```

Order commits so any dependency/build changes come before the code that relies
on them. End with a short note if some changes don't fit cleanly into one commit.
