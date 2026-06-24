const { test, expect } = require('@playwright/test');

test('jasmine specs pass without failures', async ({ page }) => {
  const pageErrors = [];
  page.on('pageerror', (error) => {
    pageErrors.push(error.message);
  });

  await page.goto('/tests-jasmine/tests.html');
  const overallResult = page.locator('.jasmine-overall-result');
  await expect(overallResult).toContainText(/0 failures/);

  const resultText = await overallResult.innerText();
  expect(resultText).toMatch(/[1-9]\d*\s+spec/);
  expect(pageErrors).toEqual([]);
});
