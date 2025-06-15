import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',    
  timeout: 30_000,         
  retries: 0,
  use: {
    baseURL: 'http://localhost:4200',  
    headless: true,               
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10_000,
    ignoreHTTPSErrors: true,
  },
  projects: [
    { name: 'chromium', use: devices['Desktop Chrome'] },
    { name: 'firefox',  use: devices['Desktop Firefox'] },
    { name: 'webkit',   use: devices['Desktop Safari'] },
  ],
});