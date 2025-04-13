import { Request, Response, NextFunction } from 'express';
import { PushNotificationService } from '../services/PushNotificationService';
import { PushSubscription } from '../entities/PushSubscription';
import { AppError } from '../middlewares/errorHandler';

export class PushNotificationController {
    private static pushService: PushNotificationService;

    private static getPushService(): PushNotificationService {
        if (!this.pushService) {
            this.pushService = PushNotificationService.getInstance();
        }
        return this.pushService;
    }

    /**
     * Registra uma nova inscrição para notificações push
     * @param req Express request object contendo os dados da inscrição
     * @param res Express response object
     * @param next Express next function
     */
    static async subscribe(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('subscribe: ', req.body);
            const { token, platform, deviceId } = req.body;

            if (!token || !platform || !deviceId) {
                throw new AppError('Token, platform e deviceId são obrigatórios', 400);
            }

            const subscription = new PushSubscription();
            subscription.token = token;
            subscription.platform = platform;
            subscription.deviceId = deviceId;

            const savedSubscription = await this.getPushService().subscribe(subscription);
            res.status(201).json({
                status: 'success',
                data: savedSubscription
            });
        } catch (error) {
            next(new AppError('Erro ao salvar inscrição: ' + error, 500));
        }
    }

    /**
     * Envia uma notificação para todos os usuários inscritos
     * @param req Express request object contendo os dados da notificação
     * @param res Express response object
     * @param next Express next function
     */
    static async sendNotification(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, body, data } = req.body;
            const payload = {
                notification: {
                    title,
                    body,
                },
                data
            };

            await this.getPushService().sendNotificationToAll(payload);
            res.status(200).json({
                status: 'success',
                message: 'Notificação enviada com sucesso'
            });
        } catch (error) {
            next(new AppError('Erro ao enviar notificação: ' + error, 500));
        }
    }
} 