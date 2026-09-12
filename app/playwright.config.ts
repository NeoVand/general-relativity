import { defineConfig } from '@playwright/test';
import fs from 'node:fs';
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
export default defineConfig({
  testDir: './tests/browser',
  timeout: 45000,
  workers: 1,
  webServer: process.env.BOOK_URL
    ? undefined
    : {
        command: 'npm run dev',
        url: 'http://127.0.0.1:5173',
        reuseExistingServer: !process.env.CI,
        timeout: 120000
      },
  use: {
    baseURL: process.env.BOOK_URL || 'http://127.0.0.1:5173',
    viewport: { width: 1440, height: 1000 },
    launchOptions: {
      ...(fs.existsSync(chrome) ? { executablePath: chrome } : {}),
      args: ['--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required']
    },
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure'
  }
});
