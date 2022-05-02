import {Entity, Column, PrimaryGeneratedColumn, ManyToMany} from "typeorm";
import { Cart } from "./Cart";

@Entity()
export class Phone {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    model: string;

    @Column({ type: "decimal", precision: 5, scale: 2 })
    price: number;

    @Column({ type: 'text', nullable: true })
    desc: string;

    @ManyToMany(() => Cart, (cart) => cart.phones)
    carts: Cart[]

}