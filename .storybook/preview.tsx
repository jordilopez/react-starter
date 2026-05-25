import type { Preview } from "@storybook/react-vite";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import "../src/index.css";

/**
 * Global Storybook preview configuration.
 *
 * `controls.matchers` auto-assigns colour and date controls
 * based on prop names.
 *
 * `withThemeByDataAttribute` adds a `data-theme` attribute to `<html>`,
 * toggling between "light" and "dark". The built-in backgrounds toolbar
 * is disabled in favour of the **Theme** toggle (paintbrush icon).
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

  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
      attributeName: "data-theme",
    }),
  ],
};

export default preview;
