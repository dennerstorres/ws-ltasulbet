import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTeamTable1743520974699 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Verifica se a tabela já existe
        const tableExists = await queryRunner.query(`
            SELECT 1 FROM information_schema.tables 
            WHERE table_schema = DATABASE() 
            AND table_name = 'team'
        `);

        if (!tableExists.length) {
            await queryRunner.query(`
                CREATE TABLE \`team\` (
                    \`id\` INT NOT NULL AUTO_INCREMENT,
                    \`name\` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
                    \`logo\` MEDIUMTEXT NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
                    \`points\` INT NOT NULL DEFAULT '0',
                    \`createdAt\` TIMESTAMP NOT NULL DEFAULT (now()),
                    \`updatedAt\` TIMESTAMP NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
                    PRIMARY KEY (\`id\`) USING BTREE
                )
                COLLATE='utf8mb4_0900_ai_ci'
                ENGINE=InnoDB;
            `);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS \`team\``);
    }

}
