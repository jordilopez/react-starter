import { defineConfig } from '@playwright/test';

export default defineConfig({
  webServer: [
    {
      command: 'npm run dev',
      port: 5173,
      reuseExistingServer: true,
    },
    {
      // Serves the Button stories exercised in button.spec.ts.
      command: 'npx storybook dev -p 6007',
      url: 'http://localhost:6007',
      reuseExistingServer: true,
      timeout: 60_000,
    },
  ],
  testDir: '.',
  use: {
    baseURL: 'http://localhost:5173',
  },
});
