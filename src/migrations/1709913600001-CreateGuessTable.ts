import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGuessTable1709913600001 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`guess\` (
                \`id\` INT NOT NULL AUTO_INCREMENT,
                \`gameId\` INT NOT NULL,
                \`userId\` INT NOT NULL,
                \`team1Id\` INT NOT NULL,
                \`team2Id\` INT NOT NULL,
                \`score1\` INT NOT NULL,
                \`score2\` INT NOT NULL,
                \`date\` DATE NOT NULL,
                \`type\` CHAR(3) NOT NULL COLLATE 'utf8mb4_general_ci',
                \`points\` INT NOT NULL,
                \`finished\` TINYINT NOT NULL,
                \`createdAt\` TIMESTAMP NOT NULL DEFAULT (now()),
                \`updatedAt\` TIMESTAMP NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (\`id\`) USING BTREE,
                CONSTRAINT \`FK_Guess_Game\` FOREIGN KEY (\`gameId\`) REFERENCES \`game\` (\`id\`) ON DELETE CASCADE,
                CONSTRAINT \`FK_Guess_User\` FOREIGN KEY (\`userId\`) REFERENCES \`user\` (\`id\`) ON DELETE CASCADE,
                CONSTRAINT \`FK_Guess_Team1\` FOREIGN KEY (\`team1Id\`) REFERENCES \`team\` (\`id\`) ON DELETE CASCADE,
                CONSTRAINT \`FK_Guess_Team2\` FOREIGN KEY (\`team2Id\`) REFERENCES \`team\` (\`id\`) ON DELETE CASCADE
            )
            COLLATE='utf8mb4_general_ci'
            ENGINE=InnoDB
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`guess\``);
    }
} 