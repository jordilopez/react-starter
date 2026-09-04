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
- [css-starter](https://github.com/jordilopez/css-starter) — shared design system (tokens, reset, native element styles)
- [CSS Modules](https://github.com/css-modules/css-modules) — app-level scoped styling (`App.module.css`)
- [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/okonet/lint-staged) — pre-commit linting

## Project Structure

```
src/
├── index.css              ← Imports css-starter (tokens, reset, base element styles)
├── main.tsx
├── App.tsx
├── App.module.css
├── App.test.tsx
├── setupTests.ts
└── components/
    ├── ui/                ← Headless UI primitives (c- prefix class)
    │   ├── Button/
    │   └── Link/
    └── layout/            ← Layout components (l- prefix class)
        ├── Header/
        └── Page/
```

## CSS Conventions

- **Components are headless** — no local component styles; the visual comes
  from css-starter's native element styles (e.g. `:where(button)`) and tokens.
- **Class hooks** — UI components apply a `c-` class (`.c-button`), layout
  components a `l-` class (`.l-header`, `.l-page`); extra classes merge via
  the `className` prop
- **App-level styles** use CSS Modules (`App.module.css`) with native nesting
- **Tokens** from css-starter (`--c-*`, `--sp-*`, …) adapt to the user's
  light/dark preference automatically

## Storybook

Stories are co-located with each component (`ComponentName.stories.tsx`).
Run with `npm run storybook`.

For AI agent context, see [AGENTS.md](./AGENTS.md).
