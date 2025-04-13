import { PushSubscription } from '../entities/PushSubscription';
import * as Notifications from 'expo-server-sdk';
import { AppDataSource } from '../config/ormconfig';

export class PushNotificationService {
    private static instance: PushNotificationService;
    private expo: Notifications.Expo;
    private repository: any;

    private constructor() {
        console.log('Inicializando PushNotificationService...');
        this.expo = new Notifications.Expo();
        this.repository = AppDataSource.getRepository(PushSubscription);
        console.log('PushNotificationService inicializado com sucesso');
    }

    public static getInstance(): PushNotificationService {
        console.log('Obtendo instância do PushNotificationService...');
        if (!PushNotificationService.instance) {
            console.log('Criando nova instância do PushNotificationService');
            PushNotificationService.instance = new PushNotificationService();
        }
        console.log('Instância do PushNotificationService obtida com sucesso');
        return PushNotificationService.instance;
    }

    public async subscribe(subscription: PushSubscription): Promise<PushSubscription> {
        console.log('Tentando salvar subscription:', subscription);
        const saved = await this.repository.save(subscription);
        console.log('Subscription salva com sucesso:', saved);
        return saved;
    }

    public async sendNotification(subscription: PushSubscription, payload: any): Promise<void> {
        try {
            console.log('Enviando notificação para:', subscription);
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
        console.log('Buscando todas as subscriptions...');
        const subscriptions = await this.repository.find();
        console.log('Subscriptions encontradas:', subscriptions.length);
        
        for (const subscription of subscriptions) {
            try {
                await this.sendNotification(subscription, payload);
            } catch (error) {
                console.error(`Erro ao enviar notificação para subscription ${subscription.id}:`, error);
            }
        }
    }
} 