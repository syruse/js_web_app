import {Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany, BaseEntity} from "typeorm";
import {IsEmail, IsDateString} from "class-validator";
import { Purchase } from "./Purchase";

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

    @ManyToMany(type => Purchase, (purchase) => purchase.users)
    @JoinTable() 
    orders: Purchase[];

}
