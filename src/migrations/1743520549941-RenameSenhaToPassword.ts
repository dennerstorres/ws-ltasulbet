import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameSenhaToPassword1743520549941 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`senha\` \`password\` VARCHAR(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`senha\` VARCHAR(255) NOT NULL`);
    }

}
