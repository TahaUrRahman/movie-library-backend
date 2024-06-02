import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text', nullable: true})
    name: string;

    @Column({type: 'text', nullable: true})
    password: string;

    @Column({type: 'boolean', default: true})
    active: boolean;
}
