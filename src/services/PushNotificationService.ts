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
        try {
            // Tenta encontrar uma inscrição existente com o mesmo endpoint
            const existingSubscription = await this.repository.findOne({
                where: { endpoint: subscription.endpoint }
            });

            if (existingSubscription) {
                // Se existir, atualiza com os novos dados
                existingSubscription.keys = subscription.keys;
                existingSubscription.userId = subscription.userId;
                return await this.repository.save(existingSubscription);
            }

            // Se não existir, cria uma nova
            return await this.repository.save(subscription);
        } catch (error) {
            console.error('Erro ao salvar inscrição:', error);
            throw error;
        }
    }

    public async sendNotification(subscription: PushSubscription, payload: any): Promise<void> {
        try {
            await webpush.sendNotification(
                {
                    endpoint: subscription.endpoint,
                    keys: subscription.keys
                },
                payload.notification,
            );
        } catch (error) {
            console.error('Erro ao enviar notificação:', error);
            throw error;
        }
    }

    public async sendNotificationToAll(payload: any): Promise<void> {
        const subscriptions = await this.repository.find();
        for (const subscription of subscriptions) {
            try {
                await this.sendNotification(subscription, payload);
            } catch (error) {
                console.error(`Erro ao enviar notificação para subscription ${subscription.id}:`, error);
            }
        }
    }

    public async sendNotificationToUser(userId: number, payload: any): Promise<void> {
        const subscriptions = await this.repository.find({ where: { userId } });
        for (const subscription of subscriptions) {
            try {
                await this.sendNotification(subscription, payload);
            } catch (error) {
                console.error(`Erro ao enviar notificação para subscription ${subscription.id}:`, error);
            }
        }
    }
} 