import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGameTable1709913600000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`game\` (
                \`id\` INT NOT NULL AUTO_INCREMENT,
                \`team1Id\` INT NOT NULL,
                \`team2Id\` INT NOT NULL,
                \`date\` DATE NOT NULL,
                \`time\` TIME NOT NULL,
                \`type\` CHAR(3) NOT NULL COLLATE 'utf8mb4_general_ci',
                \`weekNumber\` TINYINT NOT NULL,
                \`guessAllowed\` TINYINT NOT NULL,
                \`guessFinished\` TINYINT NOT NULL,
                \`createdAt\` TIMESTAMP NOT NULL DEFAULT (now()),
                \`updatedAt\` TIMESTAMP NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (\`id\`) USING BTREE
            )
            COLLATE='utf8mb4_general_ci'
            ENGINE=InnoDB
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`game\``);
    }
} 