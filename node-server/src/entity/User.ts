import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne} from "typeorm";
import { Cart } from "./Cart";

@Entity()
export class User {

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