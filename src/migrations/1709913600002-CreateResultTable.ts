import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateResultTable1709913600002 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`result\` (
                \`id\` INT NOT NULL AUTO_INCREMENT,
                \`gameId\` INT NOT NULL,
                \`score1\` INT NOT NULL,
                \`score2\` INT NOT NULL,
                \`createdAt\` TIMESTAMP NOT NULL DEFAULT (now()),
                \`updatedAt\` TIMESTAMP NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (\`id\`) USING BTREE,
                CONSTRAINT \`FK_Result_Game\` FOREIGN KEY (\`gameId\`) REFERENCES \`game\` (\`id\`) ON DELETE CASCADE
            )
            COLLATE='utf8mb4_general_ci'
            ENGINE=InnoDB
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`result\``);
    }
} 