import mongoose from 'mongoose';
import { env } from './env.config.js';
import { logger } from '../utils/logger.util.js';

const options = {
  maxPoolSize: 10,
  minPoolSize: 2,
  serverSelectionTimeoutMS: 5000,
};

export async function connectDb(uri) {
  const target = uri ?? env.mongoUri;
  try {
    await mongoose.connect(target, options);
    if (env.nodeEnv !== 'test') logger.info('MongoDB connected');
  } catch (err) {
    logger.error('MongoDB connection failed', { error: err?.message });
    throw err;
  }
}

export async function disconnectDb() {
  try {
    await mongoose.disconnect();
    logger.info('MongoDB disconnected');
  } catch (err) {
    logger.error('MongoDB disconnect error', { error: err?.message });
  }
}

mongoose.connection.on('disconnected', () => {
  logger.warn('MongoDB disconnected');
});

mongoose.connection.on('reconnect', () => {
  logger.info('MongoDB reconnected');
});
