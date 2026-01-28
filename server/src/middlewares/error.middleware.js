import { env } from '../config/env.config.js';
import { logger } from '../utils/logger.util.js';

export function errorMiddleware(err, req, res, _next) {
  const isDev = env.nodeEnv === 'development';
  const status = err.statusCode ?? err.status ?? 500;
  const code = err.code ?? 'INTERNAL_ERROR';
  const message = err.message ?? 'Internal server error';

  logger.error('Request error', {
    path: req.path,
    method: req.method,
    status,
    code,
    message,
    ...(isDev && err.stack ? { stack: err.stack } : {}),
  });

  res.status(status).json({
    success: false,
    error: {
      code,
      message,
      ...(isDev && err.details ? { details: err.details } : {}),
    },
  });
}

export function notFoundMiddleware(req, res) {
  res.status(404).json({
    success: false,
    error: { code: 'NOT_FOUND', message: `Route ${req.method} ${req.originalUrl} not found` },
  });
}
