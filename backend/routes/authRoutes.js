import { Router } from 'express';
import { body } from 'express-validator';
import { getProfile, login, logout, refresh, register } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';

const router = Router();

router.post(
  '/register',
  [body('name').notEmpty(), body('email').isEmail(), body('password').isLength({ min: 8 })],
  validate,
  register
);
router.post('/login', [body('email').isEmail(), body('password').notEmpty()], validate, login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.get('/me', protect, getProfile);

export default router;
