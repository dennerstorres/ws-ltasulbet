import { Router } from 'express';
import { PushNotificationController } from '../controllers/PushNotificationController';
//import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

//router.use(authenticate);
router.post('/subscribe', PushNotificationController.subscribe);
router.post('/send', PushNotificationController.sendNotification);

export default router; 