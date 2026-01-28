/**
 * All pricing is computed server-side. Never trust frontend values.
 * Amounts are in paise (integer) for Razorpay; 1 INR = 100 paise.
 */

/**
 * @param {number} basePricePaise - Base price in paise
 * @param {{ type: 'percentage'|'flat', value: number }} discount
 * @returns {number} Final price in paise after discount
 */
export function applyDiscount(basePricePaise, discount) {
  if (!discount || discount.value <= 0) return basePricePaise;
  if (discount.type === 'flat') {
    return Math.max(0, basePricePaise - Math.round(discount.value * 100));
  }
  const pct = Math.min(100, discount.value) / 100;
  return Math.round(basePricePaise * (1 - pct));
}

/**
 * @param {number} amountPaise - Amount in paise (after discount)
 * @param {number} taxRate - e.g. 0.18 for 18% GST
 * @returns {number} Amount including tax, in paise
 */
export function applyTax(amountPaise, taxRate = 0) {
  const rate = Math.max(0, Math.min(1, taxRate));
  return Math.round(amountPaise * (1 + rate));
}

/**
 * Compute final price in paise for a product (discount + tax).
 * @param {Object} product - { basePrice, discount: { type, value }, taxRate }
 * @returns {number} Final price in paise
 */
export function computeFinalPricePaise(product) {
  const afterDiscount = applyDiscount(product.basePrice, product.discount || {});
  return applyTax(afterDiscount, product.taxRate ?? 0);
}

/**
 * Order total in paise from line items (each item total = unit price * qty, already in paise).
 * @param {Array<{ unitPricePaise: number, quantity: number }>} items
 * @returns {number} Total in paise
 */
export function orderTotalPaise(items) {
  return items.reduce((sum, i) => sum + (i.unitPricePaise || 0) * (i.quantity || 0), 0);
}
