import webpush from 'web-push';
import { PushSubscription } from '../entities/PushSubscription';
import { AppDataSource } from '../config/ormconfig';

export class PushNotificationService {
    private repository: any;

    constructor() {
        // Inicializa as chaves VAPID
        webpush.setVapidDetails(
            `mailto:${process.env.VAPID_EMAIL}`,
            process.env.VAPID_PUBLIC_KEY!,
            process.env.VAPID_PRIVATE_KEY!
        );
        this.repository = AppDataSource.getRepository(PushSubscription);
    }


    public async subscribe(subscription: PushSubscription): Promise<PushSubscription> {
        return await this.repository.save(subscription);
    }

    public async sendNotification(subscription: PushSubscription, payload: any): Promise<void> {
        try {
            await webpush.sendNotification(
                {
                    endpoint: subscription.endpoint,
                    keys: subscription.keys
                },
                JSON.stringify(payload)
            );
        } catch (error) {
            console.error('Erro ao enviar notificação:', error);
            throw error;
        }
    }

    public async sendNotificationToAll(payload: any): Promise<void> {
        const subscriptions = await this.repository().find();
        for (const subscription of subscriptions) {
            try {
                await this.sendNotification(subscription, payload);
            } catch (error) {
                console.error(`Erro ao enviar notificação para subscription ${subscription.id}:`, error);
            }
        }
    }

    public async sendNotificationToUser(userId: number, payload: any): Promise<void> {
        const subscriptions = await this.repository().find({ where: { userId } });
        for (const subscription of subscriptions) {
            try {
                await this.sendNotification(subscription, payload);
            } catch (error) {
                console.error(`Erro ao enviar notificação para subscription ${subscription.id}:`, error);
            }
        }
    }
} 