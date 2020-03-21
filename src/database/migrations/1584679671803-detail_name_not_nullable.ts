import {MigrationInterface, QueryRunner} from "typeorm";

export class detailNameNotNullable1584679671803 implements MigrationInterface {
    name = 'detailNameNotNullable1584679671803'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "name" DROP NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "name" SET NOT NULL`, undefined);
    }

}
