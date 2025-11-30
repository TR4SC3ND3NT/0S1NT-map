import UserModel from './User.model.js';
import ResetTokenModel from './ResetToken.model.js';
import PasswordService from '../../services/PasswordService.js';
import TokenService from '../../services/TokenService.js';
import EmailService from '../../services/EmailService.js';
import {
  createError,
  validateLoginInput,
  validateRegistrationInput
} from '../../utils/validators.js';

class AuthService {
  static async register(payload) {
    validateRegistrationInput(payload);
    const existing = await UserModel.findByEmail(payload.email);
    if (existing) {
      throw createError(409, 'Email already in use');
    }
    const hashed = await PasswordService.hashPassword(payload.password);
    const user = await UserModel.createUser({
      email: payload.email,
      password: hashed,
      name: payload.name
    });
    const token = TokenService.generateAccessToken(user);
    return {
      user: UserModel.toSafeUser(user),
      token
    };
  }

  static async login(payload) {
    validateLoginInput(payload);
    const user = await UserModel.findByEmail(payload.email);
    if (!user) {
      throw createError(401, 'Invalid credentials');
    }
    const valid = await PasswordService.comparePassword(
      payload.password,
      user.password
    );
    if (!valid) {
      throw createError(401, 'Invalid credentials');
    }
    const token = TokenService.generateAccessToken(user);
    return {
      user: UserModel.toSafeUser(user),
      token
    };
  }

  static async getProfile(userId) {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw createError(404, 'User not found');
    }
    return UserModel.toSafeUser(user);
  }

  static async requestPasswordReset(email) {
    if (!email) {
      return;
    }
    const user = await UserModel.findByEmail(email);
    if (!user) {
      return;
    }
    await ResetTokenModel.deleteByUserId(user.id);
    const token = TokenService.generateRandomToken();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    await ResetTokenModel.createToken({
      userId: user.id,
      token,
      expiresAt
    });
    await EmailService.sendPasswordResetEmail(user, token);
  }

  static async resetPassword(token, newPassword) {
    if (!token || !newPassword || newPassword.length < 8) {
      throw createError(400, 'Invalid token or password');
    }
    const resetRecord = await ResetTokenModel.findValidToken(token);
    if (!resetRecord) {
      throw createError(400, 'Invalid or expired reset token');
    }
    const hashed = await PasswordService.hashPassword(newPassword);
    await UserModel.updatePassword(resetRecord.userId, hashed);
    await ResetTokenModel.deleteById(resetRecord.id);
    const user = resetRecord.user;
    const accessToken = TokenService.generateAccessToken(user);
    return {
      user: UserModel.toSafeUser(user),
      token: accessToken
    };
  }
}

export default AuthService;
