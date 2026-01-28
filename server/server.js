import app from './src/app.js';
import { connectDb, disconnectDb } from './src/config/db.config.js';
import { env } from './src/config/env.config.js';
import { logger } from './src/utils/logger.util.js';

let server;

async function start() {
  await connectDb();
  server = app.listen(env.port, () => {
    logger.info(`Server listening on port ${env.port}`, { nodeEnv: env.nodeEnv });
  });
}

function gracefulShutdown(signal) {
  logger.info(`${signal} received, shutting down gracefully`);
  if (server) {
    server.close(async () => {
      await disconnectDb();
      process.exit(0);
    });
    setTimeout(() => process.exit(1), 10000);
  } else {
    disconnectDb().then(() => process.exit(0));
  }
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('unhandledRejection', (reason, p) => {
  logger.error('Unhandled Rejection', { reason, promise: p });
});

start().catch((err) => {
  logger.error('Failed to start server', { error: err?.message });
  process.exit(1);
});
