import { cart, initializeCart } from '../../data/cart.js';

function getCartQuantity() {
  initializeCart();

  return cart.reduce((totalQuantity, cartItem) => {
    return totalQuantity + cartItem.quantity;
  }, 0);
}

export function renderCartQuantity(selector = '.js-cart-quantity') {
  const cartQuantityElement = document.querySelector(selector);
  if (!cartQuantityElement) {
    return;
  }

  cartQuantityElement.textContent = String(getCartQuantity());
}

export function renderCheckoutHeaderCartCount(selector = '.js-checkout-header-cart-count') {
  const checkoutHeaderCountElement = document.querySelector(selector);
  if (!checkoutHeaderCountElement) {
    return;
  }

  const cartQuantity = getCartQuantity();
  const itemLabel = cartQuantity === 1 ? 'item' : 'items';

  checkoutHeaderCountElement.textContent = `${cartQuantity} ${itemLabel}`;
}
