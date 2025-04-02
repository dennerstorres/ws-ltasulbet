import { Router } from 'express';
import { GameController } from '../controllers/gameController';
import { authenticate, requireAdmin } from '../middlewares/authMiddleware';


const router = Router();

router.use(authenticate);

router.get('/', GameController.findAll);
router.get('/:id', GameController.findById);


router.use(requireAdmin);

router.post('/', GameController.create);
router.put('/:id', GameController.update);
router.put('/guess/allow/:weekNumber', GameController.allowGuess);
router.put('/guess/disallow/:weekNumber', GameController.disallowGuess);
router.delete('/:id', GameController.remove);

export default router; 