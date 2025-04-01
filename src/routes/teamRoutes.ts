import { Router } from 'express';
import { TeamController } from '../controllers/teamController';
import { authenticate, requireAdmin } from '../middlewares/authMiddleware';

const router = Router();

router.use(authenticate);

router.get('/', TeamController.findAll);
router.get('/:id', TeamController.findById);

router.use(requireAdmin);

router.post('/', TeamController.create);
router.put('/:id', TeamController.update);
router.delete('/:id', TeamController.remove);
router.patch('/:id/points', TeamController.updatePoints);

export default router; 