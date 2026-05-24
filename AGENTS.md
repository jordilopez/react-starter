# Agent Context

## Project Overview

React sandbox for experimenting with components, patterns, and tooling. Built with Vite + TypeScript + React 19.

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build:** Vite 8
- **Testing:** Vitest (unit), Playwright (E2E), Storybook (visual)
- **Linting:** ESLint 10 + typescript-eslint
- **Styling:** CSS Modules (`.module.css`)
- **Git Hooks:** Husky + lint-staged

## Project Structure

```
src/
├── components/
│   ├── ui/            ← Reusable UI primitives
│   │   └── Button/
│   └── layout/        ← Layout components
│       ├── Header/
│       └── Page/
├── App.tsx
├── App.module.css
├── App.test.tsx
├── main.tsx
└── index.css          ← Global styles + CSS variables
```

## Component Conventions

Every component lives in its own folder under a namespace category:

```
components/{namespace}/{ComponentName}/
├── ComponentName.tsx
├── ComponentName.module.css   ← CSS Modules for scoped styles
├── ComponentName.test.tsx      ← Vitest unit tests
└── ComponentName.stories.tsx   ← Storybook stories
```

### Naming

- **Folders:** `PascalCase/ComponentName/`
- **Files:** `ComponentName.{tsx,module.css,test.tsx,stories.tsx}`
- **Exports:** Named exports for components, `export interface ComponentNameProps`

### JSDoc

In `.ts`/`.tsx` files: brief description line only (no `@param`/`@returns` — types are on the signature).

## Storybook

- Stories are co-located with components (`ComponentName.stories.tsx`)
- Run: `npm run storybook`
- Addons: a11y, docs, vitest, MCP

## Testing

- **Unit:** `npm test` — Vitest, co-located `*.test.tsx`
- **E2E:** `npm run test:e2e` — Playwright in `e2e/`
- **Storybook tests:** Via `@storybook/addon-vitest`

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check + build |
| `npm test` | Run unit tests |
| `npm run test:e2e` | Run Playwright E2E tests |
| `npm run lint` | ESLint check |
| `npm run storybook` | Storybook dev server |

## Pre-commit Hook

Runs `lint-staged` → `eslint --fix` on staged `.ts`, `.tsx`, `.js`, `.jsx` files.
