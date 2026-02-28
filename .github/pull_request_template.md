## Description

Provide a concise summary of the changes in this PR.

## Related Issue

- Linear: [TY-XXX](link-to-jira-ticket)
- GitHub Issue: #XXX (if applicable)

## Type of Change

- [ ] 🐛 `fix:` Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ `feat:` New feature (non-breaking change which adds functionality)
- [ ] 🔥 `feat!:` or `fix!:` Breaking change (fix or feature that would cause
      existing functionality to not work as expected)
- [ ] 📚 `docs:` Documentation update
- [ ] 🛠️ `refactor:` Code refactoring (no functional changes)
- [ ] 🎨 `style:` Code style changes (formatting, missing semi-colons, etc)
- [ ] 🚀 `perf:` Performance improvement
- [ ] ✅ `test:` Adding or updating tests
- [ ] 🔧 `chore:` Maintenance tasks (dependencies, configs, etc)
- [ ] 🔄 `ci:` CI/CD changes

## Screenshots/Videos

### Before

<!-- Add screenshots/videos if applicable -->

### After

<!-- Add screenshots/videos if applicable -->

## Testing

- [ ] Unit tests added/updated
- [ ] All tests pass locally (`pnpm test:run`)
- [ ] Tested manually in the browser
- [ ] Accessibility checked (keyboard navigation, screen reader, etc.)

## Checklist

- [ ] My code follows the conventional commits standard
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have updated the documentation (if applicable)
- [ ] My changes generate no new warnings or errors
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes

## Pre-Push Checks

The following checks will run automatically before push:

- ✅ Type checking (`tsc --noEmit`)
- ✅ Linting (`biome check`)
- ✅ Tests (`vitest run`)
- ✅ Build verification (`next build`)

## Additional Notes

<!-- Any additional context, concerns, or notes for reviewers -->
