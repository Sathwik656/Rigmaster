/**
 * Format paise (integer) to INR display string.
 * Backend sends all prices in paise (integer).
 */
export function formatPrice(paise) {
  if (typeof paise !== 'number') return '₹0';
  const rupees = paise / 100;
  return `₹${rupees.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
}

export function formatPriceWithDecimals(paise) {
  if (typeof paise !== 'number') return '₹0.00';
  const rupees = paise / 100;
  return `₹${rupees.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
