import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGuessBlockingEventTable1767523200000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`guess_blocking_event\` (
        \`id\` INT NOT NULL AUTO_INCREMENT,
        \`triggeredAt\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`weekNumber\` INT NULL,
        \`outcome\` VARCHAR(20) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
        \`message\` VARCHAR(255) NULL COLLATE 'utf8mb4_0900_ai_ci',
        \`gamesUpdated\` INT NOT NULL DEFAULT '0',
        \`guessesFinished\` INT NOT NULL DEFAULT '0',
        \`cronExpression\` VARCHAR(120) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
        \`timezone\` VARCHAR(64) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
        \`referenceDate\` DATETIME NOT NULL,
        \`createdAt\` TIMESTAMP NOT NULL DEFAULT (now()),
        PRIMARY KEY (\`id\`) USING BTREE
      )
      COLLATE='utf8mb4_0900_ai_ci'
      ENGINE=InnoDB;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS `guess_blocking_event`');
  }
}
