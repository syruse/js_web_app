import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1653308283489 implements MigrationInterface {
    name = 'Migration1653308283489'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`phones\` (\`id\` int NOT NULL AUTO_INCREMENT, \`model\` varchar(255) NOT NULL, \`price\` decimal(12,2) NOT NULL, \`desc\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`carts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`model\` varchar(255) NOT NULL, \`price\` decimal(5,2) NOT NULL, \`desc\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`pass\` varchar(255) NOT NULL, \`is_admin\` tinyint NOT NULL DEFAULT 0, \`date\` date NULL, \`cartId\` int NULL, UNIQUE INDEX \`REL_89502c44bd22c06e714c31c1e9\` (\`cartId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`carts_phones_phones\` (\`cartsId\` int NOT NULL, \`phonesId\` int NOT NULL, INDEX \`IDX_cf5eff55c2b686ad8728b45465\` (\`cartsId\`), INDEX \`IDX_639985541400ff33d07670ab4a\` (\`phonesId\`), PRIMARY KEY (\`cartsId\`, \`phonesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_89502c44bd22c06e714c31c1e93\` FOREIGN KEY (\`cartId\`) REFERENCES \`carts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`carts_phones_phones\` ADD CONSTRAINT \`FK_cf5eff55c2b686ad8728b454657\` FOREIGN KEY (\`cartsId\`) REFERENCES \`carts\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`carts_phones_phones\` ADD CONSTRAINT \`FK_639985541400ff33d07670ab4ab\` FOREIGN KEY (\`phonesId\`) REFERENCES \`phones\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`carts_phones_phones\` DROP FOREIGN KEY \`FK_639985541400ff33d07670ab4ab\``);
        await queryRunner.query(`ALTER TABLE \`carts_phones_phones\` DROP FOREIGN KEY \`FK_cf5eff55c2b686ad8728b454657\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_89502c44bd22c06e714c31c1e93\``);
        await queryRunner.query(`DROP INDEX \`IDX_639985541400ff33d07670ab4a\` ON \`carts_phones_phones\``);
        await queryRunner.query(`DROP INDEX \`IDX_cf5eff55c2b686ad8728b45465\` ON \`carts_phones_phones\``);
        await queryRunner.query(`DROP TABLE \`carts_phones_phones\``);
        await queryRunner.query(`DROP INDEX \`REL_89502c44bd22c06e714c31c1e9\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`carts\``);
        await queryRunner.query(`DROP TABLE \`phones\``);
    }

}
