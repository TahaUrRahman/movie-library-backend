import { Review } from "src/reviews/entities/review.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'text', unique: true })
    name: string;

    @Column({ type: 'text', nullable: true })
    password: string;

    @Column({ type: 'boolean', default: true })
    active: boolean;

    @OneToMany(() => Review, review => review.user)
    reviews: Review[];
}
