import bcrypt from 'bcryptjs';
import { User } from '../models/User.model.js';
import { signAccess, signRefresh, verifyRefresh } from '../utils/jwt.util.js';
import { logger } from '../utils/logger.util.js';

const SALT_ROUNDS = 12;

export async function register({ email, password, name }) {
  const existing = await User.findOne({ email: email.toLowerCase().trim() });
  if (existing) {
    throw Object.assign(new Error('Email already registered'), { statusCode: 409, code: 'EMAIL_EXISTS' });
  }
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await User.create({
    email: email.toLowerCase().trim(),
    passwordHash,
    name: name?.trim() || null,
    role: 'USER',
  });
  const u = user.toObject();
  delete u.passwordHash;
  return u;
}

export async function login({ email, password }) {
  const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+passwordHash');
  if (!user || !user.isActive) {
    throw Object.assign(new Error('Invalid credentials'), { statusCode: 401, code: 'INVALID_CREDENTIALS' });
  }
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    throw Object.assign(new Error('Invalid credentials'), { statusCode: 401, code: 'INVALID_CREDENTIALS' });
  }
  const payload = { sub: user._id.toString(), role: user.role };
  const accessToken = signAccess(payload);
  const refreshToken = signRefresh(payload);
  await User.updateOne({ _id: user._id }, { $set: { refreshToken } });
  const out = user.toObject();
  delete out.passwordHash;
  delete out.refreshToken;
  return {
    user: out,
    accessToken,
    refreshToken,
    expiresIn: '15m',
  };
}

export async function refreshTokens(refreshToken) {
  let decoded;
  try {
    decoded = verifyRefresh(refreshToken);
  } catch {
    throw Object.assign(new Error('Invalid or expired refresh token'), { statusCode: 401, code: 'INVALID_REFRESH' });
  }
  const user = await User.findById(decoded.sub).select('+refreshToken');
  if (!user || !user.isActive || user.refreshToken !== refreshToken) {
    throw Object.assign(new Error('Invalid or expired refresh token'), { statusCode: 401, code: 'INVALID_REFRESH' });
  }
  const payload = { sub: user._id.toString(), role: user.role };
  const newAccess = signAccess(payload);
  const newRefresh = signRefresh(payload);
  await User.updateOne({ _id: user._id }, { $set: { refreshToken: newRefresh } });
  return {
    accessToken: newAccess,
    refreshToken: newRefresh,
    expiresIn: '15m',
  };
}

export async function logout(userId) {
  await User.updateOne({ _id: userId }, { $unset: { refreshToken: 1 } });
  return { ok: true };
}

export async function getProfile(userId) {
  const user = await User.findById(userId).select('-passwordHash -refreshToken').lean();
  if (!user) throw Object.assign(new Error('User not found'), { statusCode: 404 });
  return user;
}
