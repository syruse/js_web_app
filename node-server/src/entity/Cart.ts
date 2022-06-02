import {Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany, BaseEntity} from "typeorm";
import { Phone } from "./Phone";

@Entity("carts")
export class Cart extends BaseEntity {

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