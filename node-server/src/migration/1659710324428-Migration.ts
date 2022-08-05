import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1659710324428 implements MigrationInterface {
    name = 'Migration1659710324428'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`brand\` enum ('Tablet', 'Phone', 'Laptop') NOT NULL, \`desc\` text NULL, UNIQUE INDEX \`IDX_723076d76859a11bca14c7610a\` (\`brand\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`devices\` (\`id\` int NOT NULL AUTO_INCREMENT, \`brand\` enum ('IPhone', 'Samsung', 'Xiomi', 'Motorola', 'Realme', 'Huawei', 'OnePlus') NOT NULL, \`model\` varchar(255) NOT NULL, \`displaySize\` decimal(3,1) NULL, \`displayType\` enum ('IPS', 'OLED', 'TFT', 'AMOLED', 'QLED') NULL, \`cpuType\` enum ('Mediatek', 'Qualcomm Snapdragon', 'Unisoc Tiger', 'Apple') NULL, \`storageType\` enum ('32', '64', '128', '256', '512', '1024') NULL, \`cameraMp\` decimal(5,1) NULL, \`cameraFrontMp\` decimal(5,1) NULL, \`battery_mAh\` int(8) NULL, \`sim\` tinyint NOT NULL DEFAULT 0, \`price\` decimal(12,2) NOT NULL, \`categoryId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`pass\` varchar(255) NOT NULL, \`is_admin\` tinyint NOT NULL DEFAULT 0, \`date\` date NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`purchases\` (\`id\` int NOT NULL AUTO_INCREMENT, \`amount\` int(8) NOT NULL, \`deliveryDestination\` text NOT NULL, \`date\` date NULL, \`deviceId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_orders_purchases\` (\`usersId\` int NOT NULL, \`purchasesId\` int NOT NULL, INDEX \`IDX_2832feabe7621cfa0723d33124\` (\`usersId\`), INDEX \`IDX_b13407c3e5cf222dd0bde950c6\` (\`purchasesId\`), PRIMARY KEY (\`usersId\`, \`purchasesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`devices\` ADD CONSTRAINT \`FK_17ef5d7808b3d831b6377032023\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`purchases\` ADD CONSTRAINT \`FK_4ef48f94db92dfdb2cd3f4b2550\` FOREIGN KEY (\`deviceId\`) REFERENCES \`devices\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_orders_purchases\` ADD CONSTRAINT \`FK_2832feabe7621cfa0723d331244\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_orders_purchases\` ADD CONSTRAINT \`FK_b13407c3e5cf222dd0bde950c6e\` FOREIGN KEY (\`purchasesId\`) REFERENCES \`purchases\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_orders_purchases\` DROP FOREIGN KEY \`FK_b13407c3e5cf222dd0bde950c6e\``);
        await queryRunner.query(`ALTER TABLE \`users_orders_purchases\` DROP FOREIGN KEY \`FK_2832feabe7621cfa0723d331244\``);
        await queryRunner.query(`ALTER TABLE \`purchases\` DROP FOREIGN KEY \`FK_4ef48f94db92dfdb2cd3f4b2550\``);
        await queryRunner.query(`ALTER TABLE \`devices\` DROP FOREIGN KEY \`FK_17ef5d7808b3d831b6377032023\``);
        await queryRunner.query(`DROP INDEX \`IDX_b13407c3e5cf222dd0bde950c6\` ON \`users_orders_purchases\``);
        await queryRunner.query(`DROP INDEX \`IDX_2832feabe7621cfa0723d33124\` ON \`users_orders_purchases\``);
        await queryRunner.query(`DROP TABLE \`users_orders_purchases\``);
        await queryRunner.query(`DROP TABLE \`purchases\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`devices\``);
        await queryRunner.query(`DROP INDEX \`IDX_723076d76859a11bca14c7610a\` ON \`categories\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
    }

}
