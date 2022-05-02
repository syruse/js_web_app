import {Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany} from "typeorm";
import { Phone } from "./Phone";

@Entity()
export class Cart {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    model: string;

    @Column({ type: "decimal", precision: 5, scale: 2 })
    price: number;

    @Column({ type: 'text', nullable: true })
    desc: string;

    @ManyToMany(type => Phone, (phone) => phone.carts)
    @JoinTable() 
    phones: Phone[];

}