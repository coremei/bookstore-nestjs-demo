import {MigrationInterface, QueryRunner} from "typeorm";

export class fourMigration1584678590723 implements MigrationInterface {
    name = 'fourMigration1584678590723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "created_at" SET DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "updated_at" SET DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT now()`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "updated_at" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "created_at" DROP DEFAULT`, undefined);
    }

}
