import { renderOrderSummary } from '../../scripts/checkout/orderSummary.js';
import { cart, loadFromStorage } from '../../data/cart.js';

describe('test suite: renderOrderSummary', () => {
  beforeEach(() => {
    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
    `;

    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify([
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }
    ]));

    loadFromStorage();
  });

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('renders cart item details', () => {
    renderOrderSummary();

    expect(document.querySelectorAll('.cart-item-container').length).toEqual(1);
    expect(document.querySelector('.product-name').innerText).toContain('Black and Gray Athletic Cotton Socks');
    expect(document.querySelectorAll('.js-delivery-option').length).toEqual(3);
  });

  it('removes the item when delete is clicked', () => {
    renderOrderSummary();

    document.querySelector('.js-delete-link').click();

    expect(document.querySelectorAll('.cart-item-container').length).toEqual(0);
    expect(cart.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});