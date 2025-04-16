import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("push_subscriptions")
export class PushSubscription {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    endpoint!: string;

    @Column("simple-json")
    keys!: {
        p256dh: string;
        auth: string;
    };

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
} 