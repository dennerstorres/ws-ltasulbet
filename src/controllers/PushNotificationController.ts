import { Request, Response, NextFunction } from 'express';
import { PushNotificationService } from '../services/PushNotificationService';
import { PushSubscription } from '../entities/PushSubscription';
import { AppError } from '../middlewares/errorHandler';

export class PushNotificationController {
    private static pushService = new PushNotificationService();

    /**
     * Registra uma nova inscrição para notificações push
     * @param req Express request object contendo os dados da inscrição
     * @param res Express response object
     * @param next Express next function
     */
    static async subscribe(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('subscribe: ', req.body);
            const subscription = new PushSubscription();
            subscription.endpoint = req.body.subscription.endpoint;
            subscription.keys = req.body.subscription.keys;
            subscription.userId = req.body.user?.id;

            const savedSubscription = await this.pushService.subscribe(subscription);
            res.status(201).json({
                status: 'success',
                data: savedSubscription
            });
        } catch (error) {
            next(new AppError('Erro ao salvar inscrição. ' + error, 500));
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
                    icon: '/icon.png',
                    badge: '/badge.png'
                },
                data
            };

            await this.pushService.sendNotificationToAll(payload);
            res.status(200).json({
                status: 'success',
                message: 'Notificação enviada com sucesso'
            });
        } catch (error) {
            next(new AppError('Erro ao enviar notificação', 500));
        }
    }

    /**
     * Envia uma notificação para um usuário específico
     * @param req Express request object contendo os dados da notificação
     * @param res Express response object
     * @param next Express next function
     */
    static async sendNotificationToUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, title, body, data } = req.body;
            const payload = {
                notification: {
                    title,
                    body,
                    icon: '/icon.png',
                    badge: '/badge.png'
                },
                data
            };

            await this.pushService.sendNotificationToUser(userId, payload);
            res.status(200).json({
                status: 'success',
                message: 'Notificação enviada com sucesso'
            });
        } catch (error) {
            next(new AppError('Erro ao enviar notificação', 500));
        }
    }
} 