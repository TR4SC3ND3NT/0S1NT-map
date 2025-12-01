import TokenService from '../services/TokenService.js';
import { createError } from '../utils/validators.js';

export default function authMiddleware(req, res, next) {
  if (req.method === 'OPTIONS') {
    return next();
  }

  const header = req.headers.authorization || '';

  if (!header.startsWith('Bearer ')) {
    return next(createError(401, 'Unauthorized: No token provided'));
  }

  const token = header.slice(7);

  try {
    const payload = TokenService.verifyAccessToken(token);
    
    const userId = payload.id;

    if (!userId) {
      return next(createError(401, 'Invalid token payload'));
    }

    req.user = {
      id: userId,
      email: payload.email
    };
    
    next();
  } catch (e) {
    console.error("Auth Error:", e.message);
    next(createError(401, 'Invalid or expired token'));
  }
}
