export function formatDeliveryDate(deliveryDays, baseDate = new Date()) {
  const deliveryDate = new Date(baseDate);
  deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);

  return deliveryDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
}
