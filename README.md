# React Sandbox

A React + TypeScript + Vite sandbox for experimenting with components, tooling, and patterns.

## Quick Start

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check with `tsc` + Vite build |
| `npm test` | Run Vitest unit tests |
| `npm run test:e2e` | Run Playwright E2E tests |
| `npm run lint` | ESLint check |
| `npm run storybook` | Storybook component explorer |
| `npm run preview` | Preview production build |

## Tech Stack

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite 8](https://vite.dev/)
- [Vitest](https://vitest.dev/) — unit testing
- [Playwright](https://playwright.dev/) — E2E testing
- [Storybook](https://storybook.js.org/) — component development
- [CSS Modules](https://github.com/css-modules/css-modules) — scoped styling
- [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/okonet/lint-staged) — pre-commit linting

## Project Structure

```
src/
├── components/
│   ├── ui/          ← Reusable UI primitives (c- prefix)
│   │   └── Button/
│   └── layout/      ← Layout components (l- prefix)
│       ├── Header/
│       └── Page/
├── styles/
│   ├── core/
│   │   ├── reset.css      ← Modern CSS reset
│   │   └── variables.css  ← Custom properties (light/dark)
│   └── basics/
│       ├── layout.css     ← #root container
│       └── typography.css ← h1, h2, p, code
├── App.tsx
├── App.module.css
├── App.test.tsx
├── main.tsx
└── index.css              ← Imports all style modules
```

## CSS Conventions

- **Root class prefix:** `c-` for UI components (`.c-button`), `l-` for layout components (`.l-header`)
- **Variants/states/sizes** use `data-*` attributes (`data-variant="primary"`, `data-size="lg"`) — not modifier classes
- **Nested CSS** is preferred over flat selectors
- **CSS Modules** (`*.module.css`) for component-scoped styles
- **Custom properties** in `:root` adapt to user's light/dark preference

## Storybook

Stories are co-located with each component (`ComponentName.stories.tsx`).
Run with `npm run storybook`.

For AI agent context, see [AGENTS.md](./AGENTS.md).
