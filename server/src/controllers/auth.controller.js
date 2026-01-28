import * as authService from '../services/auth.service.js';

export async function register(req, res, next) {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({ success: true, data: { user } });
  } catch (e) {
    next(e);
  }
}

export async function login(req, res, next) {
  try {
    const result = await authService.login(req.body);
    res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
}

export async function refresh(req, res, next) {
  try {
    const result = await authService.refreshTokens(req.body.refreshToken);
    res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
}

export async function logout(req, res, next) {
  try {
    await authService.logout(req.user._id);
    res.json({ success: true, data: { ok: true } });
  } catch (e) {
    next(e);
  }
}

export async function getProfile(req, res, next) {
  try {
    const user = await authService.getProfile(req.user._id);
    res.json({ success: true, data: { user } });
  } catch (e) {
    next(e);
  }
}
