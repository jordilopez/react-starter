import type { Preview } from "@storybook/react-vite";
import "../src/index.css";

/**
 * Global Storybook preview configuration.
 *
 * Dark mode is controlled by the user's OS preference via
 * `@media (prefers-color-scheme: dark)` in the CSS tokens.
 * No theme toggle is needed — the browser handles it automatically.
 *
 * `a11y.test` is set to `'todo'` so accessibility violations
 * surface in the test UI without failing CI.
 */
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },

    backgrounds: {
      disable: true,
    },
  },
};

export default preview;
