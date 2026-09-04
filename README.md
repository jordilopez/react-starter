# React Starter

A modern React 19 starter project with TypeScript, Vite, Storybook, headless
components styled by the shared css-starter design system, and
comprehensive testing — ready to build from day one.

## Why this starter exists

css-starter is a **framework-agnostic design system**: tokens, reset, and
native element styles live in one shared repo, independent of any UI
framework. This starter exists to consume that design system in React 19 —
it ships thin, headless components (`.c-button`, `.l-page`, …) that render
native elements and leave all styling to css-starter.

The combination gives you:

- **One source of truth** for the design system — framework starters stay
  interchangeable while the look & feel lives in css-starter
- **A brand per consumer** — each starter overrides css-starter's default
  tokens in its global CSS (this one uses React indigo); no component
  changes needed
- **Unlayered overrides win** — css-starter declares its tokens inside CSS
  cascade layers (`css-starter.*`); consumer CSS outside those layers takes
  precedence without `!important`
- **Cross-starter consistency** — the same tokens, components, and
  Storybook stories (e.g. `Design System/Token Overrides`) exist in the
  Vue, React, and Angular starters

## Customizing css-starter tokens

Token overrides are the main integration point with css-starter. In
`src/index.css`, the global `@import` is followed by unlayered `:root`
overrides that rebrand the whole app:

```css
@import 'css-starter';

:root {
  /* React brand overrides */
  --c-primary: #6366f1;
  --c-primary-hover: #4f46e5;
  --c-primary-active: #4338ca;
  --c-primary-subtle: rgba(99, 102, 241, 0.08);
  --c-focus-ring: rgba(99, 102, 241, 0.35);
}
```

The rules of the pattern:

- **Override, don't fork** — only re-declare the tokens you want to change
- **Stay unlayered** — unlayered consumer declarations outrank everything
  inside css-starter's cascade layers, so no `!important` is needed
- **Scope deeper overrides** — set tokens on any wrapper element to
  re-theme just that subtree (see the `Design System/Token Overrides`
  story in Storybook for a live demo)
- **Dark mode** — duplicate overrides inside
  `@media (prefers-color-scheme: dark)` to follow the OS preference

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

Global styles import css-starter and rebrand via token overrides (see
[Customizing css-starter tokens](#customizing-css-starter-tokens)).

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
