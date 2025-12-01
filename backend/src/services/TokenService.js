import crypto from 'crypto';
import { signJwt, verifyJwt } from '../config/jwt.js';

class TokenService {
  static generateAccessToken(user) {
    return signJwt({
      id: user.id,
      email: user.email
    });
  }

  static verifyAccessToken(token) {
    return verifyJwt(token);
  }

  static generateRandomToken() {
    return crypto.randomBytes(32).toString('hex');
  }
}

export default TokenService;
