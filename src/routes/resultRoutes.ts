import { Router } from 'express';
import { ResultController } from '../controllers/resultController';
import { authenticate, requireAdmin } from '../middlewares/authMiddleware';

const router = Router();

router.use(authenticate);
router.get('/', ResultController.findAll);
router.get('/:id', ResultController.findById);
router.get('/game/:gameId', ResultController.findByGameId);

router.use(requireAdmin);
router.post('/', ResultController.create);
router.put('/:id', ResultController.update);
router.delete('/:id', ResultController.remove);

export default router; 