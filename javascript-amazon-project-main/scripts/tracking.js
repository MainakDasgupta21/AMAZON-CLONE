import { initializeCart } from '../data/cart.js';
import { renderCartQuantity } from './shared/cartHeader.js';
import { enableImageFallback } from './shared/imageFallback.js';

initializeCart();
renderCartQuantity();
enableImageFallback();
