function getDefaultCart() {
  return [
    {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    },
    {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }
  ];
}

export let cart = [];
let isCartInitialized = false;

export function loadFromStorage(storage = localStorage) {
  let loadedCart;

  try {
    loadedCart = JSON.parse(storage.getItem('cart'));
  } catch {
    loadedCart = null;
  }

  cart = Array.isArray(loadedCart) ? loadedCart : getDefaultCart();
  isCartInitialized = true;

  return cart;
}

export function initializeCart(storage = localStorage) {
  if (!isCartInitialized) {
    loadFromStorage(storage);
  }

  return cart;
}

function saveToStorage(storage = localStorage) {
  initializeCart(storage);
  storage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  initializeCart();

  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId,
      quantity: 1,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  initializeCart();

  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  initializeCart();

  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (!matchingItem) {
    return;
  }

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}