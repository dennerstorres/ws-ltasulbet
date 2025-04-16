import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

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

    @Column({ nullable: true })
    userId!: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: "userId" })
    user!: User;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
} 