# Agent Context

## Project Overview

React sandbox for experimenting with components, patterns, and tooling. Built with Vite + TypeScript + React 19.

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build:** Vite 8
- **Testing:** Vitest (unit), Playwright (E2E), Storybook (visual)
- **Linting:** ESLint 10 + typescript-eslint
- **Styling:** [css-starter](../css-starter) design system (tokens + native element styles); CSS Modules only for app-level styles (`App.module.css`)
- **Git Hooks:** Husky + lint-staged

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

## Component Conventions

Every component lives in its own folder under a namespace category:

```
components/{namespace}/{ComponentName}/
├── ComponentName.tsx        ← Component logic (no local CSS)
├── ComponentName.test.tsx   ← Vitest unit tests
└── ComponentName.stories.tsx ← Storybook stories
```

### Naming

- **Folders:** `PascalCase/ComponentName/`
- **Files:** `ComponentName.{tsx,test.tsx,stories.tsx}`
- **Exports:** Named exports for components, `export type ComponentNameProps`

### Headless styling

- **Components carry no local CSS** — the visual comes from css-starter's
  native element styles (e.g. `:where(button)`) and tokens.
- UI components apply a `c-` class as a hook (`.c-button`), layout
  components an `l-` class (`.l-header`, `.l-page`)
- Extra classes merge via the `className` prop; all native attributes are
  forwarded
- Use native semantics (`<button disabled>`, `aria-*`) instead of custom
  `data-*` state attributes

### JSDoc

In `.ts`/`.tsx` files: brief description line only (no `@param`/`@returns` — types are on the signature).

## Storybook

- Stories are co-located with components (`ComponentName.stories.tsx`)
- Run: `npm run storybook`
- Addons: a11y, docs, vitest, MCP
- Docs pages follow the design system's light/dark tokens (see `.storybook/docs.css`)

## Testing

- **Unit:** `npm test` — Vitest, co-located `*.test.tsx`
- **E2E:** `npm run test:e2e` — Playwright in `e2e/` (app + Button stories via Storybook)
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
