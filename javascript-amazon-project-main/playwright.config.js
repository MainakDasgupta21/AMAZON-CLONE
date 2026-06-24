const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './playwright',
  timeout: 30000,
  fullyParallel: true,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:9323',
    headless: true
  },
  webServer: {
    command: 'npx http-server . -p 9323 -c-1 --silent',
    cwd: __dirname,
    port: 9323,
    reuseExistingServer: false,
    timeout: 120000
  },
  projects: [
    {
      name: 'jasmine',
      testMatch: /jasmine\.spec\.js/
    },
    {
      name: 'smoke',
      testMatch: /smoke\.spec\.js/
    }
  ]
});
