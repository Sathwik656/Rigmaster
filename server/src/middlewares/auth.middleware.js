import { verifyAccess } from '../utils/jwt.util.js';
import { User } from '../models/User.model.js';

export async function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Token required' } });
  }

  try {
    const decoded = verifyAccess(token);
    const user = await User.findById(decoded.sub).select('_id email name role isActive');
    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'User invalid or inactive' } });
    }
    req.user = user;
    req.tokenPayload = decoded;
    next();
  } catch (err) {
    const code = err.name === 'TokenExpiredError' ? 'TOKEN_EXPIRED' : 'INVALID_TOKEN';
    return res.status(401).json({ success: false, error: { code, message: 'Invalid or expired token' } });
  }
}

export function optionalAuth(req, res, next) {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) {
    req.user = null;
    return next();
  }
  authMiddleware(req, res, next);
}
