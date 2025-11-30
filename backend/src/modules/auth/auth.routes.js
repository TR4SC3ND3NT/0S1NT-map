import { Router } from 'express';
import AuthController from './Auth.controller.js';
import authMiddleware from '../../middleware/authMiddleware.js';

const router = Router();

router.post('/register', (req, res, next) =>
  AuthController.register(req, res, next)
);

router.post('/login', (req, res, next) =>
  AuthController.login(req, res, next)
);

router.post('/forgot-password', (req, res, next) =>
  AuthController.forgotPassword(req, res, next)
);

router.post('/reset-password', (req, res, next) =>
  AuthController.resetPassword(req, res, next)
);

router.get('/me', authMiddleware, (req, res, next) =>
  AuthController.me(req, res, next)
);

export default router;
