import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { authenticate, requireAdmin } from '../middlewares/authMiddleware';

const router = Router();

router.use(authenticate);
router.post('/', UserController.create);

router.get('/', UserController.findAll);
router.get('/:id', UserController.findById);
router.put('/:id/password', UserController.updatePassword);

router.use(requireAdmin);

router.put('/:id', UserController.update);
router.delete('/:id', UserController.remove);

export default router; 