import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("push_subscriptions")
export class PushSubscription {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    token!: string;

    @Column()
    platform!: string;

    @Column()
    deviceId!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
} 