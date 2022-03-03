export function transformPrice(price) {
  const transform = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

  return transform;
}