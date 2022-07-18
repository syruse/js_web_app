import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, BaseEntity} from "typeorm";
import {IsEmail, IsDateString} from "class-validator";
import { Cart } from "./Cart";

@Entity("users")
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    pass: string;

    @Column({ default: false })
    is_admin: boolean;

    @Column({ type: 'date', nullable: true })
    @IsDateString()
    date: string;

    @OneToOne(type => Cart) @JoinColumn() 
    cart: Cart;

}
