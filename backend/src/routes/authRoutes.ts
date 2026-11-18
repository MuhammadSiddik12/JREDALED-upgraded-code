import { Router } from 'express';
import { login, logout, getCurrentUser, changePassword } from '../controllers/authController.js';
import { authenticate } from '../middlewares/auth.js';
import { authRateLimiter } from '../middlewares/rateLimiter.js';

const router = Router();

router.post('/login', authRateLimiter, login);
router.post('/logout', logout);
router.get('/me', authenticate, getCurrentUser);
router.post('/change-password', authenticate, changePassword);

export default router;
