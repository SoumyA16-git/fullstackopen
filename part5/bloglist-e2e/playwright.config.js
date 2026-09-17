const { defineConfig, devices } = require('@playwright/test')

module.exports = defineConfig({
  testDir: './tests',

  webServer: {
    command: 'node node_modules/vite/bin/vite.js --port 5173',
    cwd: '../bloglist-frontend',
    url: 'http://localhost:5173',
    reuseExistingServer: true
  },

  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
    screenshot: 'only-on-failure'
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
})