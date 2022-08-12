import {Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity} from "typeorm";
import { Device } from "./Device";

export enum CategoryType {
    phone = 'Phone',
    tablet = 'Tablet',
    laptop = 'Laptop'
}

@Entity("categories")
export class Category extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: CategoryType, unique: true, nullable: false })
    name: CategoryType;

    @Column({ type: 'text', nullable: true })
    desc: string;

    @OneToMany(type => Device, (device) => device.category)
    devices: Device[];

}