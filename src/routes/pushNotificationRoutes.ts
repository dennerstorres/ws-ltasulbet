import { Router } from 'express';
import { PushNotificationController } from '../controllers/PushNotificationController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.post('/subscribe', PushNotificationController.subscribe);
router.post('/send', PushNotificationController.sendNotification);
router.post('/send-to-user', PushNotificationController.sendNotificationToUser);

export default router; 