const { test, expect } = require('@playwright/test');

async function expectPageStable(page, url, readySelector) {
  const pageErrors = [];
  page.on('pageerror', (error) => {
    pageErrors.push(error.message);
  });

  await page.goto(url);
  await expect(page.locator(readySelector)).toBeVisible();
  await page.waitForLoadState('networkidle');

  const brokenImageCount = await page.evaluate(() => {
    return Array.from(document.images).filter((image) => image.complete && image.naturalWidth === 0).length;
  });

  expect(pageErrors).toEqual([]);
  expect(brokenImageCount).toBe(0);
}

test('amazon page renders products and cart interaction works', async ({ page }) => {
  await expectPageStable(page, '/amazon.html', '.js-products-grid');

  const firstProduct = page.locator('.js-products-grid .product-container').first();
  await expect(firstProduct).toBeVisible();

  const firstButton = firstProduct.locator('.js-add-to-cart');
  const cartQuantity = page.locator('.js-cart-quantity');

  const beforeValue = Number(await cartQuantity.textContent());
  await firstButton.click();
  await expect(cartQuantity).toHaveText(String(beforeValue + 1));
});

test('checkout page renders order and payment summaries', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem(
      'cart',
      JSON.stringify([
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1'
        }
      ])
    );
  });

  await expectPageStable(page, '/checkout.html', '.js-order-summary');
  await expect(page.locator('.cart-item-container')).toHaveCount(1);
  await expect(page.locator('.js-payment-summary')).toContainText(/Order Summary/);
});

test('orders page renders static order cards', async ({ page }) => {
  await expectPageStable(page, '/orders.html', '.orders-grid');
  await expect(page.locator('.order-container').first()).toBeVisible();
});

test('tracking page renders tracking timeline', async ({ page }) => {
  await expectPageStable(page, '/tracking.html', '.order-tracking');
  await expect(page.locator('.progress-bar')).toBeVisible();
});
