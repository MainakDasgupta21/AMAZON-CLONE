import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { initializeCart } from "../data/cart.js";
import { renderCheckoutHeaderCartCount } from "./shared/cartHeader.js";
import { enableImageFallback } from "./shared/imageFallback.js";

initializeCart();
enableImageFallback();

renderOrderSummary();
renderPaymentSummary();
renderCheckoutHeaderCartCount();