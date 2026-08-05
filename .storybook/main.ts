import type { StorybookConfig } from '@storybook/react-vite';

/**
 * Storybook configuration for React + Vite.
 *
 * Addons:
 * - `@chromatic-com/storybook` — visual regression reviews
 * - `@storybook/addon-themes` — light/dark theme toggle via data-theme
 * - `@storybook/addon-vitest` — run stories as Vitest tests
 * - `@storybook/addon-a11y` — accessibility audits per story
 * - `@storybook/addon-docs` — auto-generated documentation
 * - `@storybook/addon-mcp` — MCP integration for AI tooling
 */
const config: StorybookConfig = {
  "stories": [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-themes",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp"
  ],
  "framework": "@storybook/react-vite"
};
export default config;