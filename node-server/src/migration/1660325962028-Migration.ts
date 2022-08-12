import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1660325962028 implements MigrationInterface {
    name = 'Migration1660325962028'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` enum ('Phone', 'Tablet', 'Laptop') NOT NULL, \`desc\` text NULL, UNIQUE INDEX \`IDX_8b0be371d28245da6e4f4b6187\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`pass\` varchar(255) NOT NULL, \`is_admin\` tinyint NOT NULL DEFAULT 0, \`date\` date NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`purchases\` (\`id\` int NOT NULL AUTO_INCREMENT, \`amount\` int(8) NOT NULL, \`deliveryDestination\` text NOT NULL, \`date\` date NULL, \`deviceId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`devices\` (\`id\` int NOT NULL AUTO_INCREMENT, \`brand\` enum ('IPhone', 'Samsung', 'Xiomi', 'Motorola', 'Realme', 'Huawei', 'OnePlus') NOT NULL, \`model\` varchar(255) NOT NULL, \`thumbnail\` varchar(100) NOT NULL DEFAULT '', \`displaySize\` decimal(4,1) NULL, \`displayType\` enum ('IPS', 'OLED', 'TFT', 'AMOLED', 'QLED') NULL, \`cpuType\` enum ('Mediatek', 'Qualcomm Snapdragon', 'Unisoc Tiger', 'Apple') NULL, \`storageType\` enum ('32', '64', '128', '256', '512', '1024') NULL, \`cameraMp\` decimal(5,1) NULL, \`cameraFrontMp\` decimal(5,1) NULL, \`battery_mAh\` int(2) NULL, \`quantity\` int(2) NOT NULL DEFAULT '0', \`sim\` tinyint NOT NULL DEFAULT 0, \`price\` decimal(12,2) NOT NULL, \`categoryId\` int NULL, UNIQUE INDEX \`IDX_21059a4031a5f4a8b66174967d\` (\`thumbnail\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_orders_purchases\` (\`usersId\` int NOT NULL, \`purchasesId\` int NOT NULL, INDEX \`IDX_2832feabe7621cfa0723d33124\` (\`usersId\`), INDEX \`IDX_b13407c3e5cf222dd0bde950c6\` (\`purchasesId\`), PRIMARY KEY (\`usersId\`, \`purchasesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`purchases\` ADD CONSTRAINT \`FK_4ef48f94db92dfdb2cd3f4b2550\` FOREIGN KEY (\`deviceId\`) REFERENCES \`devices\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`devices\` ADD CONSTRAINT \`FK_17ef5d7808b3d831b6377032023\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_orders_purchases\` ADD CONSTRAINT \`FK_2832feabe7621cfa0723d331244\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_orders_purchases\` ADD CONSTRAINT \`FK_b13407c3e5cf222dd0bde950c6e\` FOREIGN KEY (\`purchasesId\`) REFERENCES \`purchases\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_orders_purchases\` DROP FOREIGN KEY \`FK_b13407c3e5cf222dd0bde950c6e\``);
        await queryRunner.query(`ALTER TABLE \`users_orders_purchases\` DROP FOREIGN KEY \`FK_2832feabe7621cfa0723d331244\``);
        await queryRunner.query(`ALTER TABLE \`devices\` DROP FOREIGN KEY \`FK_17ef5d7808b3d831b6377032023\``);
        await queryRunner.query(`ALTER TABLE \`purchases\` DROP FOREIGN KEY \`FK_4ef48f94db92dfdb2cd3f4b2550\``);
        await queryRunner.query(`DROP INDEX \`IDX_b13407c3e5cf222dd0bde950c6\` ON \`users_orders_purchases\``);
        await queryRunner.query(`DROP INDEX \`IDX_2832feabe7621cfa0723d33124\` ON \`users_orders_purchases\``);
        await queryRunner.query(`DROP TABLE \`users_orders_purchases\``);
        await queryRunner.query(`DROP INDEX \`IDX_21059a4031a5f4a8b66174967d\` ON \`devices\``);
        await queryRunner.query(`DROP TABLE \`devices\``);
        await queryRunner.query(`DROP TABLE \`purchases\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_8b0be371d28245da6e4f4b6187\` ON \`categories\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
    }

}
