import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1709337600000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`user\` (
        \`id\` INT NOT NULL AUTO_INCREMENT,
        \`name\` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
        \`email\` VARCHAR(150) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
        \`senha\` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
        \`points\` INT NOT NULL DEFAULT '0',
        \`isAdmin\` TINYINT NOT NULL DEFAULT '0',
        \`createdAt\` TIMESTAMP NOT NULL DEFAULT (now()),
        \`updatedAt\` TIMESTAMP NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`) USING BTREE
      )
      COLLATE='utf8mb4_0900_ai_ci'
      ENGINE=InnoDB;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`user\``);
  }
} 