import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, BaseEntity} from "typeorm";
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
    brand: BrandType;

    @Column()
    model: string;

    @Column({ type: "decimal", precision: 3, scale: 1, nullable: true })
    displaySize: number;

    @Column({ type: 'enum', enum: DisplayType, nullable: true })
    displayType: DisplayType;

    @Column({ type: 'enum', enum: CPUType, nullable: true })
    cpuType: CPUType;

    @Column({ type: 'enum', enum: StorageType, nullable: true })
    storageType: StorageType;

    @Column({ type: "decimal", precision: 5, scale: 1, nullable: true })
    cameraMp: number;

    @Column({ type: "decimal", precision: 5, scale: 1, nullable: true })
    cameraFrontMp: number;

    @Column({ type: "int", width: 8, nullable: true })
    battery_mAh: number;

    @Column({ default: false })
    sim: boolean;

    @Column({ type: "decimal", precision: 12, scale: 2 })
    price: number;

    @OneToMany(() => Purchase, (purchase) => purchase.device)
    purchases: Purchase[]

    @ManyToOne(() => Category, (category) => category.devices)
    category: Category

}