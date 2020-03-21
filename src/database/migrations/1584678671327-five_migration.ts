import {MigrationInterface, QueryRunner} from "typeorm";

export class fiveMigration1584678671327 implements MigrationInterface {
    name = 'fiveMigration1584678671327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "created_at" SET DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "updated_at" SET DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "created_at" SET DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "updated_at" SET DEFAULT now()`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "updated_at" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "created_at" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "updated_at" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "created_at" DROP DEFAULT`, undefined);
    }

}
