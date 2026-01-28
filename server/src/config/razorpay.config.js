import Razorpay from 'razorpay';
import { env } from './env.config.js';

let razorpayInstance = null;

const mockRazorpay = {
  orders: {
    create: async (options) => ({ id: 'order_test_' + Date.now(), ...options }),
  },
};

export function getRazorpayInstance() {
  if (env.nodeEnv === 'test') return mockRazorpay;
  if (!razorpayInstance) {
    razorpayInstance = new Razorpay({
      key_id: env.razorpay.keyId,
      key_secret: env.razorpay.keySecret,
    });
  }
  return razorpayInstance;
}

export function getRazorpayWebhookSecret() {
  return env.razorpay.webhookSecret;
}
