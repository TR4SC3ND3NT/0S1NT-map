import BaseController from '../../controllers/BaseController.js';
import AuthService from './Auth.service.js';

class AuthController extends BaseController {
  async register(req, res, next) {
    try {
      const result = await AuthService.register(req.body);
      return this.created(res, result);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const result = await AuthService.login(req.body);
      return this.success(res, result);
    } catch (e) {
      next(e);
    }
  }

  async me(req, res, next) {
    try {
      const user = await AuthService.getProfile(req.user.id);
      return this.success(res, user);
    } catch (e) {
      next(e);
    }
  }

  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      await AuthService.requestPasswordReset(email);
      return this.success(res, { message: 'If the email exists, a reset link has been sent' });
    } catch (e) {
      next(e);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const { token, password } = req.body;
      const result = await AuthService.resetPassword(token, password);
      return this.success(res, result);
    } catch (e) {
      next(e);
    }
  }
}

export default new AuthController();
