import webpush from 'web-push';
import { PushSubscription } from '../entities/PushSubscription';
import { getRepository } from 'typeorm';

export class PushNotificationService {
    private static instance: PushNotificationService;
    private pushSubscriptionRepository = getRepository(PushSubscription);

    private constructor() {
        // Inicializa as chaves VAPID
        webpush.setVapidDetails(
            `mailto:${process.env.VAPID_EMAIL}`,
            process.env.VAPID_PUBLIC_KEY!,
            process.env.VAPID_PRIVATE_KEY!
        );
    }

    public static getInstance(): PushNotificationService {
        if (!PushNotificationService.instance) {
            PushNotificationService.instance = new PushNotificationService();
        }
        return PushNotificationService.instance;
    }

    public async subscribe(subscription: PushSubscription): Promise<PushSubscription> {
        return await this.pushSubscriptionRepository.save(subscription);
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
        const subscriptions = await this.pushSubscriptionRepository.find();
        for (const subscription of subscriptions) {
            try {
                await this.sendNotification(subscription, payload);
            } catch (error) {
                console.error(`Erro ao enviar notificação para subscription ${subscription.id}:`, error);
            }
        }
    }
} 