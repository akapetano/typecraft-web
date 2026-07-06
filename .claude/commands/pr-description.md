---
description: Draft a PR description from the repo template for the current branch
argument-hint: [output path — defaults to draft/pr-description.md]
---

Draft a pull request description for the current branch, following
`.github/pull_request_template.md`, then write it to the output path given in
`$ARGUMENTS`, or `draft/pr-description.md` when none is provided. **Do not commit,
push, or open a PR** — this command only drafts the description.

Steps:

1. Understand the change set: compare the current branch against its base
   (usually `develop` — check with `git log --oneline develop..HEAD` and
   `git diff develop...HEAD`, plus any uncommitted work via `git status`).
2. Fill in `.github/pull_request_template.md` faithfully, keeping its exact
   section headings and order:
   - **Description** — concise summary of what changed and why.
   - **Related Issue** — infer the Linear ticket from the branch name (e.g.
     `chore/typ-50-...` → `TYP-50`) and link
     `https://linear.app/typecraft-tech/issue/TYP-XXX`. Leave the GitHub issue
     line only if relevant.
   - **Type of Change** — check the box(es) matching the actual change.
   - **Screenshots/Videos** — keep the placeholders; note if UI changed.
   - **Testing** / **Checklist** — check items that genuinely hold; leave the
     rest unchecked rather than guessing.
   - Keep **Pre-Push Checks** as-is; fill **Additional Notes** if useful.
3. Write the result to the output path (default `draft/pr-description.md`),
   overwriting any existing content. Create parent directories if needed.

Only tick a checkbox when it's actually true — an accurate draft the author can
finish beats an over-checked one.
