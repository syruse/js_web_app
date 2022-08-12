import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, BaseEntity} from "typeorm";
import {IsEnum, Max, Min, IsUrl, IsPositive} from "class-validator";
import { Category } from "./Category";
import { Purchase } from "./Purchase";

export enum BrandType {
    iphone = 'IPhone',
    samsung = 'Samsung',
    xiomi = 'Xiomi',
    moto = 'Motorola',
    realme = 'Realme',
    huawei = 'Huawei',
    oneplus = 'OnePlus'
}

export enum DisplayType {
    ips = 'IPS',
    oled = 'OLED',
    tft = 'TFT',
    amoled = 'AMOLED',
    qled = 'QLED'
}

export enum CPUType {
    mediatek = 'Mediatek',
    qualcomm = 'Qualcomm Snapdragon',
    unisoc = 'Unisoc Tiger',
    apple = 'Apple'
}

export enum StorageType {
    _32gb = '32',
    _64gb = '64',
    _128gb = '128',
    _256gb = '256',
    _512gb = '512',
    _1tb = '1024'
}

@Entity("devices")
export class Device extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: BrandType })
    @IsEnum(BrandType)
    brand: BrandType;

    @Column()
    model: string;

    @Column({ type: "varchar", length: 100, unique: true, default: ""})
    thumbnail: string;

    @Column({ type: "decimal", precision: 4, scale: 1, nullable: true })
    @Min(0.0)
    @Max(100.0)
    displaySize: number;

    @Column({ type: 'enum', enum: DisplayType, nullable: true })
    @IsEnum(DisplayType)
    displayType: DisplayType;

    @Column({ type: 'enum', enum: CPUType, nullable: true })
    @IsEnum(CPUType)
    cpuType: CPUType;

    @Column({ type: 'enum', enum: StorageType, nullable: true })
    @IsEnum(StorageType)
    storageType: StorageType;

    @Column({ type: "decimal", precision: 5, scale: 1, nullable: true })
    @IsPositive()
    cameraMp: number;

    @Column({ type: "decimal", precision: 5, scale: 1, nullable: true })
    @IsPositive()
    cameraFrontMp: number;

    @Column({ type: "int", width: 2, nullable: true })
    @IsPositive()
    battery_mAh: number;

    @Column({ type: "int", width: 2, default: 0 })
    @IsPositive()
    quantity: number;

    @Column({ default: false })
    sim: boolean;

    @Column({ type: "decimal", precision: 12, scale: 2 })
    @IsPositive()
    price: number;

    @OneToMany(() => Purchase, (purchase) => purchase.device)
    purchases: Purchase[]

    @ManyToOne(() => Category, (category) => category.devices)
    category: Category

}