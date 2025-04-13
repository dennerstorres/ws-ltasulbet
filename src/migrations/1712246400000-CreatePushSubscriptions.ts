import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePushSubscriptions1712246400000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "push_subscriptions",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "token",
                        type: "varchar",
                        length: "500",
                    },
                    {
                        name: "platform",
                        type: "varchar",
                        length: "50",
                    },
                    {
                        name: "deviceId",
                        type: "varchar",
                        length: "100",
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updatedAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("push_subscriptions");
    }
} 