import { PushSubscription } from '../entities/PushSubscription';
import { getRepository } from 'typeorm';
import * as Notifications from 'expo-server-sdk';

export class PushNotificationService {
    private static instance: PushNotificationService;
    private expo: Notifications.Expo;

    private constructor() {
        this.expo = new Notifications.Expo();
    }

    public static getInstance(): PushNotificationService {
        if (!PushNotificationService.instance) {
            PushNotificationService.instance = new PushNotificationService();
        }
        return PushNotificationService.instance;
    }

    private getRepository() {
        return getRepository(PushSubscription);
    }

    public async subscribe(subscription: PushSubscription): Promise<PushSubscription> {
        return await this.getRepository().save(subscription);
    }

    public async sendNotification(subscription: PushSubscription, payload: any): Promise<void> {
        try {
            const message = {
                to: subscription.token,
                sound: 'default',
                title: payload.notification.title,
                body: payload.notification.body,
                data: payload.data,
            };

            const chunks = this.expo.chunkPushNotifications([message]);
            const tickets = [];

            for (let chunk of chunks) {
                try {
                    const ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
                    tickets.push(...ticketChunk);
                } catch (error) {
                    console.error('Erro ao enviar notificação:', error);
                }
            }
        } catch (error) {
            console.error('Erro ao enviar notificação:', error);
            throw error;
        }
    }

    public async sendNotificationToAll(payload: any): Promise<void> {
        const subscriptions = await this.getRepository().find();
        for (const subscription of subscriptions) {
            try {
                await this.sendNotification(subscription, payload);
            } catch (error) {
                console.error(`Erro ao enviar notificação para subscription ${subscription.id}:`, error);
            }
        }
    }
} 