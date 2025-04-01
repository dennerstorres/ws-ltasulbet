import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.post('/login', AuthController.login);

router.get('/me', authenticate, AuthController.me);

export default router; 