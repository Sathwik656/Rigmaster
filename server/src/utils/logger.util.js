const levels = { error: 0, warn: 1, info: 2, debug: 3 };
const nodeEnv = process.env.NODE_ENV || 'development';

function log(level, message, meta = {}) {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...(Object.keys(meta).length ? { meta } : {}),
  };
  const out = level === 'error' ? process.stderr : process.stdout;
  out.write(JSON.stringify(entry) + '\n');
}

export const logger = {
  info: (msg, meta) => log('info', msg, meta ?? {}),
  warn: (msg, meta) => log('warn', msg, meta ?? {}),
  error: (msg, meta) => log('error', msg, meta ?? {}),
  debug: (msg, meta) => (nodeEnv === 'development' ? log('debug', msg, meta ?? {}) : null),
};
