import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserIdToPushSubscriptions1744766179223 implements MigrationInterface {
    name = 'AddUserIdToPushSubscriptions1744766179223'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`push_subscriptions\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`team\` CHANGE \`points\` \`points\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`team\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`team\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`team\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`team\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`game\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`game\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`game\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`game\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`guess\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`guess\` ADD \`type\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`guess\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`guess\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`guess\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`guess\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`result\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`result\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`result\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`result\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`push_subscriptions\` DROP COLUMN \`endpoint\``);
        await queryRunner.query(`ALTER TABLE \`push_subscriptions\` ADD \`endpoint\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`push_subscriptions\` DROP COLUMN \`keys\``);
        await queryRunner.query(`ALTER TABLE \`push_subscriptions\` ADD \`keys\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`push_subscriptions\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`push_subscriptions\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`push_subscriptions\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`push_subscriptions\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`game\` ADD CONSTRAINT \`FK_d4b333f72e02a281b4fd344f025\` FOREIGN KEY (\`team1Id\`) REFERENCES \`team\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`game\` ADD CONSTRAINT \`FK_0d2cd7c808af03d24b6755afae8\` FOREIGN KEY (\`team2Id\`) REFERENCES \`team\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`guess\` ADD CONSTRAINT \`FK_364f83751f24dc9ba29361d579a\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`guess\` ADD CONSTRAINT \`FK_317497f056aab20072434b51a1c\` FOREIGN KEY (\`gameId\`) REFERENCES \`game\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`guess\` ADD CONSTRAINT \`FK_630527c93acf616232a5840ddf1\` FOREIGN KEY (\`team1Id\`) REFERENCES \`team\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`guess\` ADD CONSTRAINT \`FK_2c1c43a3fed6c8521180aa00c59\` FOREIGN KEY (\`team2Id\`) REFERENCES \`team\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`result\` ADD CONSTRAINT \`FK_4233ef2a25b3c72e910b176c55d\` FOREIGN KEY (\`gameId\`) REFERENCES \`game\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`push_subscriptions\` ADD CONSTRAINT \`FK_4cc061875e9eecc311a94b3e431\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`push_subscriptions\` DROP FOREIGN KEY \`FK_4cc061875e9eecc311a94b3e431\``);
        await queryRunner.query(`ALTER TABLE \`result\` DROP FOREIGN KEY \`FK_4233ef2a25b3c72e910b176c55d\``);
        await queryRunner.query(`ALTER TABLE \`guess\` DROP FOREIGN KEY \`FK_2c1c43a3fed6c8521180aa00c59\``);
        await queryRunner.query(`ALTER TABLE \`guess\` DROP FOREIGN KEY \`FK_630527c93acf616232a5840ddf1\``);
        await queryRunner.query(`ALTER TABLE \`guess\` DROP FOREIGN KEY \`FK_317497f056aab20072434b51a1c\``);
        await queryRunner.query(`ALTER TABLE \`guess\` DROP FOREIGN KEY \`FK_364f83751f24dc9ba29361d579a\``);
        await queryRunner.query(`ALTER TABLE \`game\` DROP FOREIGN KEY \`FK_0d2cd7c808af03d24b6755afae8\``);
        await queryRunner.query(`ALTER TABLE \`game\` DROP FOREIGN KEY \`FK_d4b333f72e02a281b4fd344f025\``);
        await queryRunner.query(`ALTER TABLE \`push_subscriptions\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`push_subscriptions\` ADD \`updatedAt\` timestamp(0) NULL DEFAULT 'now()' ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`push_subscriptions\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`push_subscriptions\` ADD \`createdAt\` timestamp(0) NULL DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE \`push_subscriptions\` DROP COLUMN \`keys\``);
        await queryRunner.query(`ALTER TABLE \`push_subscriptions\` ADD \`keys\` json NULL`);
        await queryRunner.query(`ALTER TABLE \`push_subscriptions\` DROP COLUMN \`endpoint\``);
        await queryRunner.query(`ALTER TABLE \`push_subscriptions\` ADD \`endpoint\` varchar(500) NULL`);
        await queryRunner.query(`ALTER TABLE \`result\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`result\` ADD \`updatedAt\` timestamp(0) NOT NULL DEFAULT 'now()' ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`result\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`result\` ADD \`createdAt\` timestamp(0) NOT NULL DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE \`guess\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`guess\` ADD \`updatedAt\` timestamp(0) NOT NULL DEFAULT 'now()' ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`guess\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`guess\` ADD \`createdAt\` timestamp(0) NOT NULL DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE \`guess\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`guess\` ADD \`type\` char(3) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`game\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`game\` ADD \`updatedAt\` timestamp(0) NOT NULL DEFAULT 'now()' ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`game\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`game\` ADD \`createdAt\` timestamp(0) NOT NULL DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE \`team\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`team\` ADD \`updatedAt\` timestamp(0) NOT NULL DEFAULT 'now()' ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`team\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`team\` ADD \`createdAt\` timestamp(0) NOT NULL DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE \`team\` CHANGE \`points\` \`points\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`updatedAt\` timestamp(0) NOT NULL DEFAULT 'now()' ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`createdAt\` timestamp(0) NOT NULL DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE \`push_subscriptions\` DROP COLUMN \`userId\``);
    }

}
