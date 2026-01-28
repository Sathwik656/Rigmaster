/**
 * Unit tests for pricing util (no DB). Validates backend-owned pricing logic.
 */
import test from 'node:test';
import assert from 'node:assert';
import {
  applyDiscount,
  applyTax,
  computeFinalPricePaise,
  orderTotalPaise,
} from '../src/utils/pricing.util.js';

test('applyDiscount flat reduces by value in rupees (converted to paise)', () => {
  assert.strictEqual(applyDiscount(10000, { type: 'flat', value: 50 }), 5000);
  assert.strictEqual(applyDiscount(10000, { type: 'flat', value: 0 }), 10000);
});

test('applyDiscount percentage reduces by rate', () => {
  assert.strictEqual(applyDiscount(10000, { type: 'percentage', value: 10 }), 9000);
  assert.strictEqual(applyDiscount(10000, { type: 'percentage', value: 100 }), 0);
});

test('applyTax adds tax correctly', () => {
  assert.strictEqual(applyTax(10000, 0.18), 11800);
  assert.strictEqual(applyTax(10000, 0), 10000);
});

test('computeFinalPricePaise returns backend-correct final price', () => {
  const p = { basePrice: 10000, discount: { type: 'percentage', value: 10 }, taxRate: 0.18 };
  const final_ = computeFinalPricePaise(p);
  assert.strictEqual(final_, applyTax(applyDiscount(10000, p.discount), 0.18));
});

test('orderTotalPaise sums line items', () => {
  const items = [
    { unitPricePaise: 1000, quantity: 2 },
    { unitPricePaise: 500, quantity: 4 },
  ];
  assert.strictEqual(orderTotalPaise(items), 4000);
});
