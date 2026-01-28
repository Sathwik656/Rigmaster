import jwt from 'jsonwebtoken';
import { env } from '../config/env.config.js';

export function signAccess(payload) {
  return jwt.sign(payload, env.jwt.accessSecret, {
    expiresIn: env.jwt.accessExpiry,
    issuer: 'rig-master',
  });
}

export function signRefresh(payload) {
  return jwt.sign(payload, env.jwt.refreshSecret, {
    expiresIn: env.jwt.refreshExpiry,
    issuer: 'rig-master',
  });
}

export function verifyAccess(token) {
  return jwt.verify(token, env.jwt.accessSecret, { issuer: 'rig-master' });
}

export function verifyRefresh(token) {
  return jwt.verify(token, env.jwt.refreshSecret, { issuer: 'rig-master' });
}
