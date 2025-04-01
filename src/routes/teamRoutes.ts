import { Router } from 'express';
import { TeamController } from '../controllers/teamController';

const router = Router();

// Rotas para times
router.post('/', TeamController.create);
router.get('/', TeamController.findAll);
router.get('/:id', TeamController.findById);
router.put('/:id', TeamController.update);
router.delete('/:id', TeamController.remove);
router.patch('/:id/points', TeamController.updatePoints);

export default router; 