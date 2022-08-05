import {Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany, ManyToOne, BaseEntity} from "typeorm";
import {IsDateString} from "class-validator";
import { Device } from "./Device";
import { User } from "./User";

@Entity("purchases")
export class Purchase extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "int", width: 8 })
    amount: number;

    @Column({ type: 'text', nullable: false })
    deliveryDestination: string;

    @Column({ type: 'date', nullable: true })
    @IsDateString()
    date: string;

    @ManyToOne(() => Device, (device) => device.purchases)
    device: Device

    @ManyToMany(type => User, (user) => user.orders)
    @JoinTable() 
    users: User[];

}