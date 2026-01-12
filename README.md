# Typecraft Web

This is a [Next.js](https://nextjs.org) project bootstrapped with
[`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 📜 Table of Contents

- [Typecraft Web](#typecraft-web)
  - [📜 Table of Contents](#-table-of-contents)
  - [🛠️ Tech Stack](#️-tech-stack)
  - [🚀 Getting Started](#-getting-started)
  - [🌐 Automated Dependency Updates](#-automated-dependency-updates)
  - [🎨 Styling](#-styling)
  - [🧪 Testing](#-testing)
  - [🎯 Code Quality \& Standards](#-code-quality--standards)
    - [Available Commands](#available-commands)
    - [Git Hooks (Husky)](#git-hooks-husky)
    - [Commit Message Format](#commit-message-format)
    - [Editor Setup (Recommended)](#editor-setup-recommended)
  - [🤝 Contributing](#-contributing)
  - [📚 Learn More](#-learn-more)

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **UI Library:** [Ark UI 5](https://ark-ui.com/) - Headless UI components
- **Styling:** [Panda CSS 1.8](https://panda-css.com/) - CSS-in-JS with zero
  runtime
- **Icons:** [Lucide React](https://lucide.dev/)
- **Testing:** [Vitest 4](https://vitest.dev/) +
  [Testing Library](https://testing-library.com/)
- **Code Quality:** [Biome 2.2](https://biomejs.dev/) - Fast linter & formatter
- **Git Hooks:** [Husky 9](https://typicode.github.io/husky/) +
  [lint-staged](https://github.com/lint-staged/lint-staged)
- **Commit Standards:** [Commitlint](https://commitlint.js.org/) (Conventional
  Commits)
- **Package Manager:** [pnpm](https://pnpm.io/)

## 🚀 Getting Started

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd typecraft-web
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

   This will also:

   - Set up Husky git hooks automatically
   - Generate Panda CSS types

3. **Run the development server:**

   ```bash
   pnpm dev
   ```

4. **Open your browser:**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the app.

## 🌐 Automated Dependency Updates

This project uses **Dependabot** to keep dependencies up-to-date automatically.

### How It Works

- **Schedule:** Dependabot runs **weekly** (Mondays at 6:00 AM UTC)
- **Updates:** Checks for updates to all `pnpm` dependencies
- **Grouping:** Related dependencies are grouped to reduce PR noise
- **Auto-merge:** Minor and patch updates merge automatically after CI passes
- **Manual review:** Major version updates require manual approval

### Dependency Groups

Dependencies are organized into logical groups:

| Group                | Packages                                                   | Auto-merge     |
| -------------------- | ---------------------------------------------------------- | -------------- |
| **React & Next.js**  | `react`, `react-dom`, `next`                               | ✅ Minor/Patch |
| **Ark UI**           | `@ark-ui/*`                                                | ✅ Minor/Patch |
| **Panda CSS**        | `@pandacss/*`                                              | ✅ Minor/Patch |
| **Testing**          | `vitest`, `@vitest/*`, `@testing-library/*`, `jsdom`, etc. | ✅ Minor/Patch |
| **Biome**            | `@biomejs/*`                                               | ✅ Minor/Patch |
| **Commitlint**       | `@commitlint/*`                                            | ✅ Minor/Patch |
| **Husky**            | `husky`, `lint-staged`                                     | ✅ Minor/Patch |
| **Type Definitions** | `@types/*`                                                 | ✅ Minor/Patch |

### Manual Trigger

To manually trigger Dependabot:

1. Go to **GitHub → Repository → Insights → Dependency Graph → Dependabot**
2. Click **"Check for updates"**

### Configuration

- **Dependabot config:** `.github/dependabot.yml`
- **Auto-merge workflow:** `.github/workflows/dependabot-auto-merge.yml`

## 🎨 Styling

This project uses **Panda CSS** for styling with **Ark UI** for accessible,
headless components.

- **Panda CSS:** Zero-runtime CSS-in-JS with type-safe styles
- **Theme Configuration:** `panda.config.ts`
- **Design Tokens:** Located in `src/theme/`
- **Recipes:** Reusable component styles in `src/theme/recipes/`

After changing Panda configuration, regenerate types:

```bash
pnpm prepare:panda
```

## 🧪 Testing

This project uses **Vitest** for fast, modern testing with a comprehensive setup
for React components.

### Running Tests

```bash
# Run tests in watch mode (development)
pnpm test

# Run tests once (CI/pre-push)
pnpm test:run

# Run with visual UI
pnpm test:ui

# Generate coverage report
pnpm test:coverage
```

### Testing Setup

- **Framework:** Vitest with jsdom environment
- **React Testing:** Testing Library (React, User Event, Jest DOM)
- **Accessibility Testing:** vitest-axe for a11y checks
- **Browser API Mocks:** ResizeObserver, IntersectionObserver, and more (see
  `src/tests/vitest.setup.ts`)

### Writing Tests

Tests are co-located with components:

```
src/components/core/Button/
├── Button.tsx
└── Button.test.ts ← Tests here
```

## 🎯 Code Quality & Standards

This project enforces **strict code quality** using **Biome** and **automated
git hooks**.

### Available Commands

| Command         | Description                         |
| --------------- | ----------------------------------- |
| `pnpm lint`     | Check for code issues               |
| `pnpm format`   | Format code using Biome             |
| `pnpm fix`      | Auto-fix all fixable linting issues |
| `pnpm test`     | Run tests in watch mode             |
| `pnpm test:run` | Run tests once                      |
| `pnpm build`    | Build for production                |

### Git Hooks (Husky)

Git hooks run automatically to ensure code quality:

#### 🔹 Pre-Commit Hook

**Runs on:** `git commit`

- Formats and lints **staged files only** using `lint-staged`
- Runs type checking with TypeScript
- ⚡ **Fast** (~5 seconds)

#### 🔹 Commit Message Hook

**Runs on:** `git commit`

- Validates commit messages follow
  [Conventional Commits](https://www.conventionalcommits.org/)
- Enforces format: `type(scope): subject`
- ⚡⚡⚡ **Instant**

#### 🔹 Pre-Push Hook

**Runs on:** `git push`

- Type checks entire codebase
- Lints all files
- Runs full test suite
- Builds the project
- 🐢 **Slower** (~30s-2min) - catches issues before they reach remote

**Skip hooks in emergencies:**

```bash
git commit --no-verify   # Skip pre-commit & commit-msg
git push --no-verify     # Skip pre-push
```

### Commit Message Format

This project follows
[Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

**Examples:**

```bash
git commit -m "feat: add dark mode toggle"
git commit -m "fix: resolve button hover state"
git commit -m "docs: update README with testing guide"
git commit -m "refactor(auth): simplify token validation"
git commit -m "test: add Button component tests"
```

**Allowed types:**

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `chore` - Maintenance tasks
- `ci` - CI/CD changes
- `build` - Build system changes

### Editor Setup (Recommended)

**VS Code (Cursor):**

Install the Biome extension:

- [Biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)

The project includes `.vscode/settings.json` with:

- Auto-format on save
- Biome as default formatter

## 🤝 Contributing

1. **Create a feature branch:**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes and commit:**

   ```bash
   git add .
   git commit -m "feat: add your feature"
   ```

   The pre-commit hook will automatically format and lint your staged files.

3. **Push your branch:**

   ```bash
   git push -u origin feature/your-feature-name
   ```

   The pre-push hook will run full checks before pushing.

4. **Open a pull request**

## 📚 Learn More

### Next.js Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js GitHub](https://github.com/vercel/next.js)

### UI & Styling

- [Ark UI Documentation](https://ark-ui.com/)
- [Panda CSS Documentation](https://panda-css.com/)

### Testing

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

### Code Quality

- [Biome Documentation](https://biomejs.dev/)
- [Conventional Commits](https://www.conventionalcommits.org/)
