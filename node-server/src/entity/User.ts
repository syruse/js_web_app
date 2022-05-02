import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, BaseEntity} from "typeorm";
import { Cart } from "./Cart";

@Entity("users")
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    pass: string;

    @Column({ type: 'date', nullable: true })
    date: string;

    @OneToOne(type => Cart) @JoinColumn() 
    cart: Cart;

}