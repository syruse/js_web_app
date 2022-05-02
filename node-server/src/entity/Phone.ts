import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, BaseEntity} from "typeorm";
import { Cart } from "./Cart";

@Entity("phones")
export class Phone extends BaseEntity {

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