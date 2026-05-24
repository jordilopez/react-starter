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
│   ├── ui/          ← Reusable UI primitives
│   └── layout/      ← Layout components
├── styles/
│   ├── core/        ← Reset + CSS custom properties (light/dark)
│   └── basics/      ← Base element styles (typography, layout)
├── App.tsx
├── main.tsx
└── index.css        ← Imports all style modules
```

For AI agent context, see [AGENTS.md](./AGENTS.md).
