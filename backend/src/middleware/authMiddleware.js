import TokenService from '../services/TokenService.js';
import { createError } from '../utils/validators.js';

export default function authMiddleware(req, res, next) {
  const header = req.headers.authorization || '';

  if (!header.startsWith('Bearer ')) {
    return next(createError(401, 'Unauthorized'));
  }

  const token = header.slice(7);

  try {
    const payload = TokenService.verifyAccessToken(token);
    req.user = {
      id: payload.sub,
      email: payload.email
    };
    next();
  } catch (e) {
    next(createError(401, 'Invalid or expired token'));
  }
}
