import { Router } from 'express';
import { GuessBlockingController } from '../controllers/guessBlockingController';

const router = Router();

router.get('/', GuessBlockingController.dashboard);
router.get('/status', GuessBlockingController.status);
router.get('/history', GuessBlockingController.history);

export default router;
