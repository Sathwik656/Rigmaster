import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});


dotenv.config();

const required = [
  'PORT',
  'MONGO_URI',
  'JWT_ACCESS_SECRET',
  'JWT_REFRESH_SECRET',
 // 'RAZORPAY_KEY_ID',
 // 'RAZORPAY_KEY_SECRET',
];

const optional = {
  NODE_ENV: 'development',
  JWT_ACCESS_EXPIRY: '15m',
  JWT_REFRESH_EXPIRY: '7d',
 // RAZORPAY_WEBHOOK_SECRET: '',
  RATE_LIMIT_WINDOW_MS: '900000',
  RATE_LIMIT_MAX: '100',
};

const testDefaults = {
  PORT: '5000',
  MONGO_URI: 'mongodb+srv://sathwik:SHjZSsF2A1E5G09k@cluster0.zg4bwa2.mongodb.net/?appName=Cluster0',
  JWT_ACCESS_SECRET: 'c5604318a388ad6333a894e316b5238391c97ebb282961fabb2cbc69756785d9095277570ca0c26e2958044b2a3c78bc3e05ec310043b44dce20add467ede374',
  JWT_REFRESH_SECRET: 'e30cce68caa0e86917ccdac2ad78b2573713825ac4559f58ae9afb991d440e4a5c520294673af58c6957ab9a52e287f75d525a9e9c48e749a6bcbea35d62721f',
//  RAZORPAY_KEY_ID: 'rzp_test_xxx',
//  RAZORPAY_KEY_SECRET: 'test_secret_xxx',
};

function loadEnv() {
  const isTest = process.env.NODE_ENV === 'test';
  if (isTest) {
    for (const [k, v] of Object.entries(testDefaults)) {
      if (!process.env[k]?.trim()) process.env[k] = v;
    }
  }
  const missing = required.filter((key) => !process.env[key]?.trim());
  if (missing.length) {
    throw new Error(
      `Missing required environment variables. App cannot start: ${missing.join(', ')}`
    );
  }

  const config = {
    port: Number(process.env.PORT) || 5000,
    nodeEnv: process.env.NODE_ENV || optional.NODE_ENV,
    mongoUri: String(process.env.MONGO_URI).trim(),
    jwt: {
      accessSecret: process.env.JWT_ACCESS_SECRET.trim(),
      refreshSecret: process.env.JWT_REFRESH_SECRET.trim(),
      accessExpiry: process.env.JWT_ACCESS_EXPIRY || optional.JWT_ACCESS_EXPIRY,
      refreshExpiry: process.env.JWT_REFRESH_EXPIRY || optional.JWT_REFRESH_EXPIRY,
    },
//    razorpay: {
//      keyId: process.env.RAZORPAY_KEY_ID.trim(),
//      keySecret: process.env.RAZORPAY_KEY_SECRET.trim(),
//      webhookSecret: (process.env.RAZORPAY_WEBHOOK_SECRET || optional.RAZORPAY_WEBHOOK_SECRET).trim(),
//    },
    rateLimit: {
      windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
      max: Number(process.env.RATE_LIMIT_MAX) || 100,
    },
  };

  return Object.freeze(config);
}

export const env = loadEnv();
