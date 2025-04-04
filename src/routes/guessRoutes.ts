import { Router } from 'express';
import { GuessController } from '../controllers/guessController';
import { authenticate, requireAdmin } from '../middlewares/authMiddleware';

const router = Router();

router.use(authenticate);
router.get('/', GuessController.findAll);
router.get('/:id', GuessController.findById);
router.get('/user/:userId', GuessController.findByUserId);
router.put('/:id/finish', GuessController.finish);

router.use(requireAdmin);
router.post('/', GuessController.create);
router.put('/:id', GuessController.update);
router.delete('/:id', GuessController.remove);
router.get('/game/:gameId', GuessController.findByGameId);
router.put('/:id/points', GuessController.updatePoints);

export default router; 